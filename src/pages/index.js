import * as React from "react"
import { graphql, Link } from "gatsby"// 追加
import { GatsbyImage } from "gatsby-plugin-image" // 追加

import Layout from "../components/layout"
import Seo from "../components/seo"
import Image from '../components/image'

// markup
const IndexPage = ({ data }) => {
  return (
        <div>
        {/* Layoutコンポーネントの内側の要素がプロパティとして渡される */}
        <Layout>
          <Seo/>
          <section className="hero">
            <figure>
              {/* <Img fluid={data.hero.childImageSharp.fluid} alt="" style={{ height: "100%" }}/> */}

              {/* ppendix A */}
              <Image
                filename="hero.jpg"
                alt=""
                style={{ height: "100%" }}
              />
            </figure>
            <div className="catch">
              <h1>There is no love sincerer than<br /> the love of food.</h1>
              <p>食物を愛するよりも誠実な愛はない ― バーナード・ショー</p>
            </div>
            <div className="wave">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1366 229.5"
                fill="#fff"
              >
                <path
                  d="M1369,6.3C1222.5-12.2,1189.5,8,919.2,96.6C665,179.8,160,141.7-2,53.1v150l1371-14.2V6.3z"
                  opacity=".53"
                />
                <path d="M1369 229.5V55.8c-9.5-2.4-19.2-4.4-28.9-5.8-196.9-29.9-203.4-15.8-503.9 82.6-219.8 72-627.6 53.2-838.2-10.5v107.4h1371z" />
              </svg>
            </div>
          </section>
          <section className="food">
            <div className="container">
              <h2 className="bar">Food <span>Essence</span></h2>
              <div className="details">
                <div className="detail">
                <figure>
                  {/* <Img fluid={data.fruit.childImageSharp.fluid} alt="" /> */}

                  {/* <GatsbyImage
                    image={data.fruit.childImageSharp.gatsbyImageData}
                    alt=""
                  /> */}

                {/* ppendix A */}
                <Image
                  filename="fruit.jpg"
                  alt=""
                  style={{ height: "100%" }}
                />

                </figure>
                  <h3>フルーツ</h3>
                  <p>FRUIT</p>
                  <p>甘くてすっぱくておいしい果実たち。<br />旬のフルーツを満喫します。</p>
                </div>
                <div className="detail">
                <figure>
                  {/* <GatsbyImage
                    image={data.grain.childImageSharp.gatsbyImageData}
                    alt=""
                  /> */}
                  {/* ppendix A */}
                  <Image
                    filename="grain.jpg"
                    alt=""
                    style={{ height: "100%" }}
                  />
                </figure>
                  <h3>穀物</h3>
                  <p>GRAIN</p>
                  <p>食事の基本となる穀物。<br />毎日の活動のエネルギー源になります。</p>
                </div>
                <div className="detail">
                  <figure>
                    {/* <GatsbyImage
                      image={data.beverage.childImageSharp.gatsbyImageData}
                      alt=""
                    /> */}

                    {/* ppendix A */}
                    <Image
                      filename="beverage.jpg"
                      alt=""
                      style={{ height: "100%" }}
                    />
                  </figure>
                  <h3>飲み物</h3>
                  <p>BEVERAGE</p>
                  <p>リラックスするのに欠かせない飲み物。<br />お気に入りの一杯はありますか？</p>
                </div>
              </div>
            </div>
          </section>
          <section className="photo">
            <h2 className="sr-only">Photo</h2>
            <figure>
              {/* <Img fluid={data.berry.childImageSharp.fluid} alt="赤く熟したベリー" style={{ height: "100%" }}/> */}

              {/* <GatsbyImage
                image={data.berry.childImageSharp.gatsbyImageData}
                alt="赤く熟したベリー"
                style={{ height: "100%" }}
              /> */}

              {/* ppendix A */}
              <Image
                filename="berry.jpg"
                alt=""
                style={{ height: "100%" }}
              />

            </figure>
          </section>

          <section>
            <div className="container">
            <h2 className="sr-only">RECENT POSTS</h2>
            <div className="posts">
              {data.allContentfulBlogPost.edges.map(({ node }) => (
                <article className="post" key={node.id}>
                  <Link to={`/blog/post/${node.slug}/`}>
                    <figure>
                      <GatsbyImage
                        image={node.eyecatch.gatsbyImageData}
                        alt={node.eyecatch.description}
                        style={{ height: "100%" }}
                      />
                    </figure>
                    <h3>{node.title}</h3>
                  </Link>
                </article>
              ))}
            </div>
            </div>
          </section>

        </Layout>

        </div>
  )
}

export const query = graphql`
  query {
 
    allContentfulBlogPost(
        sort: { order: DESC, fields: publishDate }
        skip: 0
        limit: 4
    ) {
        edges {
            node {
                title
                id
                slug
                eyecatch {
                gatsbyImageData(width: 573, layout: CONSTRAINED)
                description
                }
            }
        }
    }
  }
`

/*

  [ppendix Aのセクションで削除したクエリ]
  この設定では image.js のクエリの maxWidth の値を変えることができない
  useStaticQuery ではクエリに変数を使うことができないという制限があるので、
  必要に応じて処理を分けるなどの対応を考える必要がある

  hero: file(relativePath: { eq: "hero.jpg" }) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }

  fruit: file(relativePath: { eq: "fruit.jpg" }) {
    childImageSharp {
      gatsbyImageData(width: 320, layout: CONSTRAINED)
    }
  }
  grain: file(relativePath: { eq: "grain.jpg" }) {
    childImageSharp {
      gatsbyImageData(width: 320, layout: CONSTRAINED)
    }
  }
  beverage: file(relativePath: { eq: "beverage.jpg" }) {
    childImageSharp {
      gatsbyImageData(width: 320, layout: CONSTRAINED)
    }
  }
  berry: file(relativePath: { eq: "berry.jpg" }) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  pattern: file(relativePath: { eq: "pattern.jpg" }) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
*/

export default IndexPage
