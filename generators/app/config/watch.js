'use strict';

//We use `webpack` to bundle without `watch`
var path = require('path');
var srcPath = path.join(__dirname, './../src');
module.exports = {
  module: {
    rules: [] //We use `.babelrc` to support react-hot
  },
  resolve: {
    alias: {
      actions: srcPath + '/actions/',
      components: srcPath + '/components/',
      sources: srcPath + '/sources/',
      stores: srcPath + '/stores/',
      styles: srcPath + '/styles/',
      // config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  }
};