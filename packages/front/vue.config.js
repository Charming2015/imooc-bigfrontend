const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        '@router': resolve('src/router'),
        '@state': resolve('src/state'),
        '@utils': resolve('src/utils'),
        '@api': resolve('src/api'),
        '@views': resolve('src/views'),
        '@components': resolve('src/components'),
      },
    },
  },
};
