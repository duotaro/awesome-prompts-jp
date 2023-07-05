import Head from "next/head.js";
import Layout from '../components/layout.js'
export const databaseId = process.env.NOTION_DATABASE_ID;
import { getReposReadme } from "@/lib/github.js";


export default function Home({prompts, titleList}) {
  const copyToClipboard = async (id) => {
    if (process.browser) {
      const textarea = document.getElementById(`prompt${id}`)
      if(!textarea || !textarea.value){
        alert("値が取得できませんでした。")
      }
      await global.navigator.clipboard.writeText(textarea.value);
      alert("コピーしました。")
    }
  };
  

  return (
    <Layout>
      <Head>
        <title>ChatGPT 効果的なprompt集</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mt-5">
        <div className="row">
          <section className="col-lg-12">
            {/* <div className="row justify-content-center m-3 ">
              <div className="m-1 mb-2" >
                <h5 className="fw-bolder" data-toggle="collapse" data-target="#collapseAbout">このサイトについて</h5>
                <p className="collapse" id="collapseAbout">
                  このサイトは<a href="https://github.com/f/awesome-chatgpt-prompts" target="_blank">awesome-chatgpt-prompts</a>で紹介されているChatGPTから効果的な回答をもらうためのprompt集を日本語化し、よりChartGPTで使いやすいようにと作成したものです。
                  Google App Script経由でLanguageAPPのtranslateメソッドを使用して自動翻訳しているため、不自然な文言になっていることもあるかと思います。
                  また、日本語の方が使いやすいという方向けに作成していますが、元々の言語が英語で書かれているため、翻訳後に不自然なpromptになってしまっていることもありますので、臨機応変に変更して使ってください。
                </p>
              </div>
            </div>
            <div className="row justify-content-center m-3 gx-4 gx-lg-5 ">
              <div className="m-1 mb-2" style={{minHeight:'50px'}}>
              <h5 className="fw-bolder" data-toggle="collapse" data-target="#collapseHowToUse">使い方</h5>
              <p className="collapse" id="collapseHowToUse">各ブロックごとに役割とそれに関するpromptが用意されています。
                promptはtextareaとなっているので、画面上で修正・追加などが可能です。テンプレートをもとに、ご自身の求めるpromptを作り上げてください。
                完成したpromptをコピーして、ChatGPTに質問してください！</p>
              </div>
            </div> */}

            <div className="row justify-content-center m-3 gx-4 gx-lg-5 mb-5">
              <div className="card-body" style={{maxHeight:'300px', overflow: 'scroll'}}>
                  <div className="row">
                      <div className="container">
                          <div className="row">
                            {titleList.map((title) => {
                              return (
                                <div className="col-3 text-nowrap" style={{width:'fit-content', overflow:'hidden', textOverflow: 'ellipsis'}} key={title.id}>
                                  <a href={`/#${title.id}`} className="col  btn btn-outline-secondary m-1 text-nowrap"  style={{overflow:'hidden', textOverflow: 'ellipsis'}}>
                                    {title.title}
                                  </a>
                                </div>
                              )
                            })}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            <div className="row gx-4 gx-lg-5 row-cols-lg-3 row-cols-md-2 row-cols-xs-1 justify-content-center">
              {prompts.map((prompt, index) => {
                return (
                    <div className="col mb-5" key={prompt.title} id={prompt.title.replaceAll(" ", "-").replaceAll("'", "")}>
                        <div className="card h-100">
                            <div className="card-body p-4">
                                <div className="text-center m-1 mb-2" style={{minHeight:'50px'}}>
                                    <h5 className="fw-bolder">{prompt.title}</h5>
                                </div>
                                <div className="text-center">
                                  <div className="bg-dark" style={{minHeight:'220px'}}>
                                    <div >
                                      <code >
                                          <textarea id={`prompt${index}`} className="text-white bg-dark p-2" 
                                            style={{border: 'none', width: '100%', minHeight: '200px', lineHeight: '1', resize: 'none'}} 
                                            defaultValue={prompt.prompt}
                                            ></textarea>
                                      </code>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-center m-2">
                                  <button className="btn btn-outline-dark mt-auto link" onClick={() => copyToClipboard(index)}>コピーする</button>
                                </div>
                            </div>
                            <div className="card-footer p-1 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                  created by　
                                  {prompt.contributer.map((cont) => {
                                    return (
                                      <a className="mt-auto link-dark mr-3" target="_blanc" href={cont.url} key={cont.name}>{cont.name}</a>
                                    )
                                  })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
              })}
            </div>
          </section>
        </div>{/* .row */}
      </div>{/* .container */}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const prompts = await getReposReadme('f', 'awesome-chatgpt-prompts');
  // titleからタグを作って、アンカーで飛ばす
  let  titleList = []
  let  tmpList = []
  for(const prompt of prompts) {
    const title = prompt.title

    const titleObj = {
      id: title.replaceAll(" ", "-").replaceAll("'", ""),
      title: title,
    }
    if(tmpList.indexOf(title) == -1){
      titleList.push(titleObj)
      tmpList.push(title)
    }
  }

  return {
    props: {
      prompts: prompts,
      titleList: titleList
    },
    revalidate: 1,
  };
};

