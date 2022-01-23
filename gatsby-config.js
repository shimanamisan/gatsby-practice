module.exports = {
    siteMetadata: {
      title: `mysite`,
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'images',
          path: `${__dirname}/src/images`,
        }
      }
    ]
}