import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

// markup
const NotFoundPage = ({ location }) => {
  return (
    <Layout>
      <SEO pagetitle="ページが見つかりません" pagepath={location.pagepath}/>
      <h1 style={{ padding: "30vh 0", textAlign: "center" }}>お探しのページは見つかりませんでした</h1>
      <div style={{ margin: "0 auto", width: "30%" }}>
        <Link to={'/'} style={{ textAlign: "center" }}>トップに戻る</Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
