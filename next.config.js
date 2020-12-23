// const { aliasTinaDev } = require('@tinacms/webpack-helpers')

// const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

require('dotenv').config()


// module.exports = {
//   env: {
//     GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
//     REPO_FULL_NAME: process.env.REPO_FULL_NAME,
//     BASE_BRANCH: process.env.BASE_BRANCH,
//   },
//   // ...
// }
// export const env = {
//   GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
//   REPO_FULL_NAME: process.env.REPO_FULL_NAME,
//   BASE_BRANCH: process.env.BASE_BRANCH,
// };


const config = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    BASE_REPO_FULL_NAME: process.env.BASE_REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  trailingSlash: true,
  exportPathMap: async function() {
    return {}
  },
  webpack(config) {
    if (process.env.TINA) {
      let watch
      if (process.env.TINA_WATCH) {
        watch = process.env.TINA_WATCH.split(',')
      }
      aliasTinaDev(config, process.env.TINA, watch)
    }

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    config.node = {
      fs: 'empty',
    }

    // config.plugins.push(new MomentLocalesPlugin())

    return config
   },
 }

module.exports = config