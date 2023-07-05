import { Octokit } from "octokit";
import { deeplTranslate, doDeeplTranslate } from "./deepl";

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
});

export const getReposReadme = async (owner, repo) => {
    if(!owner) owner = 'f'
    if(!repo) repo = 'awesome-chatgpt-prompts'
    let res = await octokit.request("GET /repos/{owner}/{repo}/readme", {
        owner: owner,
        repo: repo,
    });

    const readme = res.data.content
    //decode
    const decoded = atob(readme);

    // 加工
    // 改行で分割
    const splited = decoded.split(/\n/)
    const promptIndex = splited.indexOf("# Prompts")
    const len = splited.length

    const reqReadme = splited.slice(promptIndex + 2, len)


    let result = []
    let obj = {
        title: '',
        contributer: [],
        other: [],
        prompt: ''
    }
    let containPrompt = false


    let index = 0

    for(const item of reqReadme){
        // 改行があればリストに突っ込んでから初期化
        if(item == '' && containPrompt){
            result.push(obj)
            obj = {
                title: '',
                contributer: [],
                other: [],
                prompt: ''
            }
            containPrompt = false
            continue;
        }


        

        // title
        if(item.indexOf("##") == 0){
            //## で切るなら3, Act as で切るなら9
            //obj.title = await convertTranslation(item.substring(3))
            const cutIndex = 9
            if(index < 5){
                obj.title = await doConvertTranslation(item.substring(cutIndex))
            } else {
                obj.title = await convertTranslation(item.substring(cutIndex))
            }
            // obj.title = await convertTranslation(item.substring(3))
        } else if (item.indexOf("Contributed") == 0) {
            const contList = item.substring(16).split(/(&|\s)/)
            for(const cont of contList){
                if(!cont){
                    continue
                }
                const matched = cont.match(/\(.+\)/g)
                if(!matched){
                    continue
                }
                const url = matched[0].replace("(", "").replace(")", "")
                const name = "@" + url.replace("https://github.com/", "").replace("/", "")
                obj.contributer.push({
                    name: name,
                    url: url
                })
            }
        } else if (item.indexOf("> ") == 0) {
            if(index < 5){
                obj.prompt = await doConvertTranslation(item.substring(2))
            } else {
                obj.prompt = await convertTranslation(item.substring(2))
            }
            //obj.prompt = await convertTranslation(item.substring(2))
            containPrompt = true
        } else {
            // 複数あるかもしれない？
            obj.other.push(item)
        }
        index++
    }
    return result
}


/**
 * 翻訳する or しなかった場合はそのまま返却
 * @param {*} target 
 * @returns 
 */
const convertTranslation = async (target) => {
    const res = await deeplTranslate(target)
    if(res['translations']){
        return res['translations'][0].text
    }
    return res
}

/**
 * テスト用
 * 強制翻訳
 * @param {*} target 
 * @returns 
 */
const doConvertTranslation = async (target) => {
    const res = await doDeeplTranslate(target)
    if(res.translations){
        return res.translations[0].text
    }
    return res
}