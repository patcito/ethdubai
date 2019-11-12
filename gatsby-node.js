const each = require('lodash/each')
const path = require('path')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const PostTemplate = path.resolve('./src/templates/index.js')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allFile(filter: { extension: { regex: "/md|js/" } }, limit: 1000) {
              edges {
                node {
                  id
                  name: sourceInstanceName
                  path: absolutePath
                  remark: childMarkdownRemark {
                    id
                    frontmatter {
                      layout
                      path
                    }
                  }
                }
              }
            }
          }
        `
      ).then(({ errors, data }) => {
        if (errors) {
          console.log(errors)
          reject(errors)
        }

        // Create blog posts & pages.
        const items = data.allFile.edges
        const posts = items.filter(({ node }) => /posts/.test(node.name))
        each(posts, ({ node }) => {
          if (!node.remark) return
          const { path } = node.remark.frontmatter
          createPage({
            path,
            component: PostTemplate,
          })
        })

        const pages = items.filter(({ node }) => /page/.test(node.name))
        each(pages, ({ node }) => {
          if (!node.remark) return
          const { name } = path.parse(node.path)
          const PageTemplate = path.resolve(node.path)
          createPage({
            path: name,
            component: PageTemplate,
          })
        })
      })
    )
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  // speakers images
  createResolvers({
    Eventlama_Speaker: {
      localFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.avatarUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })

  // Collaborators images
  createResolvers({
    Eventlama_Collaborator: {
      localFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.avatarUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })

  // Sponsors images
  createResolvers({
    Eventlama_Sponsor: {
      localFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.logoUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

// https://github.com/gatsbyjs/gatsby/issues/8404
// https://dev.to/nevernull/gatsby-with-wpgraphql-acf-and-gatbsy-image-72m
// https://thoughtsandstuff.com/gatsby-with-wordpress-caching-downloaded-media-images-to-reduce-build-time/
