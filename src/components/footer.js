import React from "react"
// ページコンポーネント以外で useStaticQuery を使用しないと駄目
import { graphql, useStaticQuery } from "gatsby" // 追加
import Img from "gatsby-image" // 追加

const Footer = () => {

    const data = useStaticQuery(graphql`
        query{
            pattern: file(relativePath: {eq: "pattern.jpg"}) {
                    childImageSharp {
                        fluid(maxWidth: 1920, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
        }
    `)

    return (
        <footer className="footer">
            <div className="container">
                <div className="site">
                <a href="base-index.html">
                    <img src="/images/logo-w.svg" alt="ESSENTIALS" />
                    <p>おいしい食材と食事を探求するサイト</p>
                </a>
                </div>
                <ul className="sns">
                <li>
                    <a href="https://twitter.com/">
                    <i className="fab fa-twitter" />
                    <span className="sr-only">Twitter</span>
                    </a>
                </li>
                <li>
                    <a href="https://facebook.com/">
                    <i className="fab fa-facebook-square" />
                    <span className="sr-only">Facebook</span>
                    </a>
                </li>
                <li>
                    <a href="http://instagram.com/">
                    <i className="fab fa-instagram" />
                    <span className="sr-only">Instagram</span>
                    </a>
                </li>
                </ul>
            </div>
            <div className="back">
                <Img fluid={data.pattern.childImageSharp.fluid} alt="" style={{ height: "100%" }}/>
            </div>
        </footer>
    )
}

export default Footer