import Head from "next/head";
import Link from "next/link";
import Layout from '../../components/layout'

import { META_ABOUT_TITLE, META_ABOUT_DESCRIPTION } from "../../const/meta";


export const databaseId = process.env.NOTION_DATABASE_ID;

export default function About({  }) {
  return (
    <Layout>
      <Head>
        <title>{META_ABOUT_TITLE}</title>
        <meta name="description" content="TechnologyとConvenienceを組み合わせた造語。​ITがもたらす便利なものを紹介します。最近はAI関連の記事が多いです。ChatGPT / Google Bard / OpenAI GPT / Replika" />
      </Head>

      <div className="container mt-5">
        <div className="row">
          <section className="col">
            <div className="row gx-4 gx-lg-5 row-cols-lg-2 row-cols-1 justify-content-center">

            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}