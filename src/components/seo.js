import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

// props: コンポーネントに渡されたプロパティを受け取る
// P170: 分割代入でコードをスッキリさせる
const SEO = ({ pagetitle, pagedesc, pagepath, pageimg, pageimgw, pageimgh, }) => {

    const {site: {siteMetadata },} = useStaticQuery(graphql`
        query {
            site {
                    siteMetadata {
                        title
                        lang
                        description
                        siteUrl
                    }
                }
        }
    `)

    // トップページ以外のページでは「ページごとのタイトル｜サイト名」と表示させる
    const title = pagetitle ? `${pagetitle}｜${siteMetadata.title}` : siteMetadata.title
    const description = pagedesc || siteMetadata.description
    const url = pagedesc ? `${siteMetadata.siteUrl}${pagepath}` : siteMetadata.siteUrl

    const imgurl = pageimg ? `${siteMetadata.siteUrl}${pageimg}` : `${siteMetadata.siteUrl}/thumb.jpg`
    const imgw = pageimgw || 1280
    const imgh = pageimgh || 640

    return (
        <Helmet>
            <html lang={siteMetadata.lang}/>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <link rel="canonical" href={url} />

            <meta property="og:site_name" content={siteMetadata.title}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:url" content={url}/>

            <meta property="og:type" content="website"/>

            <meta property="og:locale" content={siteMetadata.locale}/>

            <meta property="og:image" content={imgurl}/>
            <meta property="og:image:width" content={imgw}/>
            <meta property="og:image:height" content={imgh}/>
        </Helmet>
    )
}



export default SEO