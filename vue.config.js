const CopyWebpackPlugin = require('copy-webpack-plugin')

// https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

module.exports = {
  lintOnSave: true,

  configureWebpack: {
    // copy markdown content into dist
    plugins: [new CopyWebpackPlugin([{ from: './content/', to: './content/' }])]
  }
}
