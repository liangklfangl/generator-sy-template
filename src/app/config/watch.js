//We use `webpack` to bundle without `watch`
const path = require('path');
const srcPath = path.join(__dirname, './../src');
module.exports = {
  module:{
   rules:[]//We use `.babelrc` to support react-hot
  },
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
      actions: path.join(srcPath ,'/actions/').split(path.sep).join("/"),  
      components: path.join(srcPath ,'/components/').split(path.sep).join("/"),  
      sources: path.join(srcPath ,'/sources/').split(path.sep).join("/"),  
      stores: path.join(srcPath ,'/stores/').split(path.sep).join("/"),  
      styles: path.join(srcPath ,'/styles/').split(path.sep).join("/"),  
      config: path.join(srcPath ,'/config/test.js').split(path.sep).join("/"),  
      'react/lib/ReactMount': 'react-dom/lib/ReactMount',
      'react/lib/ReactTestUtils': 'react-dom/lib/ReactTestUtils'  
    }
  }
}



