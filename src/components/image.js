import React from "react" // appendix A
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image" // appendix A

export default props => {
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          fluid(maxWidth: 1600) {
            originalName
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <figure>
      <Img
        // ファイル名が一致した画像のfluidのデータを取り出し、Imgコンポーネントのfluidで指定
        fluid={ allImageSharp.nodes.find(n => n.fluid.originalName === props.filename).fluid }
        alt={props.alt}
        style={props.style}
      />
    </figure>
  )
}

// allContentfulAsset.nodes.find(n => n.file.url === assetUrl).fluid