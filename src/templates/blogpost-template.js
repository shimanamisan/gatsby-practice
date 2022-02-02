import * as React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image" // 追加
import { renderRichText } from "gatsby-source-contentful/rich-text" // 追加
import { BLOCKS } from "@contentful/rich-text-types" // 追加

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faFolderOpen} from "@fortawesome/free-regular-svg-icons"
import { faChevronLeft, faChevronRight, faCheckSquare } from "@fortawesome/free-solid-svg-icons"

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer" // 追加

import Seo from "../components/seo"

const options = {
    renderNode: {
        // <h2>要素のレンダリングを変更
        [BLOCKS.HEADING_2]: (node, children) => (
        <h2>
            <FontAwesomeIcon icon={faCheckSquare} />
            {children}
        </h2>
        ),
        // リッチテキスト内の画像を表示する
        [BLOCKS.EMBEDDED_ASSET]: node => (
        <GatsbyImage
            image={node.data.target.gatsbyImageData}
            alt={
            node.data.target.description
                ? node.data.target.description
                : node.data.target.title // 説明が未入力の場合はタイトルを返す
            }
        />
        ),
    },

    // 公式に掲載されている、改行コードを<br/>タグに変換する記述
    renderText: text => {
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment]
      }, [])
    },
  }

const BlogPost = ( {data, pageContext, location} ) => {
    return (

    <Layout>
        <Seo
            pagetitle={data.contentfulBlogPost.title}
            pagedesc={`${documentToPlainTextString(
                JSON.parse(data.contentfulBlogPost.content.raw)
            ).slice(0, 70)}…`}
            pagepath={location.pathname}
            blogimg={`https:${data.contentfulBlogPost.eyecatch.file.url}`}
            pageimgw={data.contentfulBlogPost.eyecatch.file.details.image.width}
            pageimgh={data.contentfulBlogPost.eyecatch.file.details.image.height}
        />

    <div className="eyecatch">
    <figure>
        <GatsbyImage
          image={data.contentfulBlogPost.eyecatch.gatsbyImageData}
          alt={data.contentfulBlogPost.eyecatch.description}
        />
    </figure>
    </div>
    <article className="content">
    <div className="container">
        <h1 className="bar">{data.contentfulBlogPost.title}</h1>
        <aside className="info">
        <time dateTime={data.contentfulBlogPost.publishDateJP}>
            <FontAwesomeIcon icon={faClock}/>{data.contentfulBlogPost.publishDateJP}</time>
        <div className="cat">
            <FontAwesomeIcon icon={faFolderOpen}/>
            <ul>
                {console.log(data.contentfulBlogPost.category)}
                {/* 複数のカテゴリーが存在している場合は、配列で渡ってくるので map関数で取得する */}
                {data.contentfulBlogPost.category.map( cat => (
                    // リストにはユニークなIDをつける必要があるので key 属性で各要素にIDを付与する
                    <li className={cat.categorySlug} key={cat.id}>{cat.category}</li>
                ))}
            </ul>
        </div>
        </aside>
        <div className="postbody">
            {renderRichText(data.contentfulBlogPost.content, options)}
        </div>
        <ul className="postlink">
            {pageContext.next && (
                <li className="prev">
                <Link to={`/blog/post/${pageContext.next.slug}/`} rel="prev">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>{pageContext.next.title}</span>
                </Link>
                </li>
            )}
            {pageContext.previous && (
                <li className="next">
                <Link to={`/blog/post/${pageContext.previous.slug}/`} rel="next">
                    <span>{pageContext.previous.title}</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                </li>
            )}
        </ul>
    </div>
    </article>


    </Layout>

    )
}

// contextで指定したオブジェクトがテンプレートへ送られてくる
// $idでIDが一致した記事のデータを取得するように指定
export const query = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      publishDateJP: publishDate(formatString: "YYYY年MM月DD日")
      publishDate
      category {
        category
        categorySlug
        id
      }
      eyecatch {
        gatsbyImageData(layout: FULL_WIDTH)
        description
        file {
          details {
            image {
              width
              height
            }
          }
          url
        }
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData(layout: FULL_WIDTH)
            title
            description
          }
        }
      }
    }
  }
`

export default BlogPost