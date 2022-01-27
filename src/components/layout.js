import React from "react"

import Header from "../components/header"
import Footer from "../components/footer"

import "./layout.css"

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