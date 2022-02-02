const path = require("path")

// Gatsbyがページを生成する際に、特定のタイミングやイベントに合わせて処理をさせたいケースが有る
// そういったときに使用するのが、gatsby-node.jsだ
// Gatsby Node API として用意されているものがいくつか有り、関数の形でexportすることで利用する
// ここでは createPages を使用している
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    // 非同期処理
    const blogresult = await graphql(`
        query {
            allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
            edges {
                node {
                    id
                    slug
                }
                next {
                    title
                    slug
                }
                previous {
                    title
                    slug
                }
            }
        }
    }
    `)

  // エラーメッセージを出力する処理
  if (blogresult.errors) {
    reporter.panicOnBuild(`GraphQL のクエリでエラーが発生しました`)
    return
  }

  blogresult.data.allContentfulBlogPost.edges.forEach(
    ({ node, next, previous }) => {
        // Actionsとして用意されている関数の中のcreatePageで、クエリから取得した記事ページを生成する
        createPage({
            path: `/blog/post/${node.slug}/`,
            component: path.resolve(`./src/templates/blogpost-template.js`),
            // contextで指定したオブジェクトへテンプレートを送る
            // 送られてきたテンプレートは$をつけることでクエリの変数として扱うことができる。pageContextプロパティとして扱うことも可能
            // ここではidとして、node.idを指定している
            context: {
                id: node.id,
                next,
                previous,
            },
        })
    }
  )

//   const blogPostsPerPage = 6 //１ページに表示する記事の数
//   const blogPosts = blogresult.data.allContentfulBlogPost.edges.length //記事の総数
//   const blogPages = Math.ceil(blogPosts / blogPostsPerPage) //記事一覧ページの総数

//   Array.from({ length: blogPages }).forEach((_, i) => {
//     createPage({
//       path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
//       component: path.resolve("./src/templates/blog-template.js"),
//       context: {
//         skip: blogPostsPerPage * i,
//         limit: blogPostsPerPage,
//         currentPage: i + 1, //現在のページ番号
//         isFirst: i + 1 === 1, //最初のページ
//         isLast: i + 1 === blogPages, //最後のページ
//       },
//     })
//   })

//   blogresult.data.allContentfulCategory.edges.forEach(({ node }) => {
//     const catPostsPerPage = 6 //１ページに表示する記事の数
//     const catPosts = node.blogpost.length //カテゴリーに属した記事の総数
//     const catPages = Math.ceil(catPosts / catPostsPerPage) //カテゴリーページの総数

//     Array.from({ length: catPages }).forEach((_, i) => {
//       createPage({
//         path:
//           i === 0
//             ? `/cat/${node.categorySlug}/`
//             : `/cat/${node.categorySlug}/${i + 1}/`,
//         component: path.resolve(`./src/templates/cat-template.js`),
//         context: {
//           catid: node.id,
//           catname: node.category,
//           catslug: node.categorySlug,
//           skip: catPostsPerPage * i,
//           limit: catPostsPerPage,
//           currentPage: i + 1, //現在のページ番号
//           isFirst: i + 1 === 1, //最初のページ
//           isLast: i + 1 === catPages, //最後のページ
//         },
//       })
//     })
//   })
}