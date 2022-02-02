require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
      title: `ESSENTIALS`,
      description: `美味しい食材と食事を探求するサイト`,
      lang: `ja`,
      siteUrl: `https://optimistic-euler-682692.netlify.app`,
      locale: `ja_JP`,
    },
    plugins: [
      `gatsby-plugin-image`, // v4系で画像を使用するために追加
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'images',
          path: `${__dirname}/src/images`,
        }
      },
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `ESSENTIALS エッセンシャルズ`,
          short_name: `ESSENTIALS`,
          start_url: `/`,
          background_color: `#ffffff`,
          theme_color: `#477294`,
          display: `standalone`,
          icon: `src/images/icon.png`
        }
      },
      `gatsby-plugin-offline`,
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
          accessToken: process.env.GATSBY_CONTENTFUL_API_KEY,
          host: process.env.CONTENTFUL_HOST
        }
      }
    ]
}