'use strict';

var path = require('path');
var srcPath = path.join(__dirname, "../src");

module.exports = {
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    'react/lib/ReactContext': 'window',
    'sinon': 'window.sinon'
  },
  resolve: {
    alias: {
      actions: srcPath + '/actions/',
      components: srcPath + '/components/',
      sources: srcPath + '/sources/',
      stores: srcPath + '/stores/',
      styles: srcPath + '/styles/',
      config: srcPath + '/config/test',
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  }
};