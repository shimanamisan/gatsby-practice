import * as React from "react"
import { graphql, Link } from "gatsby" // 追加
import { GatsbyImage } from "gatsby-plugin-image" // 追加

import Layout from "../components/layout"
import Seo from "../components/seo"

const Blog = ( {data, location} ) => {
    
    return (
        <Layout>
            <Seo
                pagetitle="ブログ"
                pagedesc="ESSENTIALSのブログです"
                pagepath={location.pathname}
            />
            <section className="content bloglist">
                <div className="container">
                    <h1 className="bar">RECENT POSTS</h1>
                    <div className="posts">
                    {data.allContentfulBlogPost.edges.map( ({ node }) => (
                        <article className="post" key={node.id}>
                            <Link to={`/blog/post/${node.slug}/`}>
                                <figure>
                                {/* <img src="images-baseblog/eyecatch.jpg" alt="アイキャッチ画像の説明" /> */}
                                    <GatsbyImage
                                    image={node.eyecatch.gatsbyImageData}
                                    alt={node.eyecatch.description}
                                    style={{ height: "100%" }}
                                    />
                                </figure>
                                <h3>{node.title}</h3>
                            </Link>
                        </article>
                    )) }
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export const query = graphql`

query {
        allContentfulBlogPost(sort: {order: DESC, fields: publishDate}) {
                edges {
                    node {
                    title
                    id
                    slug
                    eyecatch {
                        gatsbyImageData(layout: FULL_WIDTH)
                        description
                    }
                }
            }
        }
    }
`

export default Blog