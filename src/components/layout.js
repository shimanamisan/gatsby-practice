import React from "react"

import Header from "../components/header"
import Footer from "../components/footer"

import "./layout.css"

// Font AwesomeのCSSを先読みする設定
import "@fortawesome/fontawesome-svg-core/styles.css"
// Font Awesomeのコンポーネント内でCSSを適応しないようにする設定
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Layout = ({ children }) =>{

    return (
        <div>
                <Header />
                    {/* ページごとのコンテンツをプロパティで受け取る */}
                    { children }
                <Footer/>
        </div>
    )
}

export default Layout