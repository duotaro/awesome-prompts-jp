import Head from "next/head";
import Navbar from './navbar'
import Footer from './footer'
import AdSense from '../components/ads/ad'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="description" content="ChatGPT 効果的なprompt集/ " />
        <meta property="og:image"  contents="https://cdn-ak.f.st-hatena.com/images/fotolife/d/duo-taro100/20230501/20230501153944.jpg"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <AdSense />
      {/* <nav className="navbar navbar-expand navbar-light bg-dark gnav">
      </nav> */}
      <main>{children}</main>
      <Footer />
    </>
  )
}