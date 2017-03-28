const merge = require('webpack-merge');
const util = require('util');
const path = require('path');
const module1= {
	module:{
       rules:[{
          test: /\.jsx$/,
         exclude:path.resolve('node_modules'),
	      use:[{
	      	loader: 'babel-loader',
	      	 // exclude: function(path){
         //       var isNpmModule=!!path.match(/node_modules/);
         //       return isNpmModule;
         //    },
	      	options:{
	      	}
	      }]
	   }]
	}
}
//loader will override it!
const module2 = {
	module:{
       rules:[
       {
          test: /\.jsx$/,
          exclude:path.resolve('node_modules'),
	      use:[{
	      	loader: 'react-hot-loader',
	      	 // exclude: function(path){
         //       var isNpmModule=!!path.match(/node_modules/);
         //       return isNpmModule;
         //    },
	      	options:{}
	      }]
	      
	  }]
	}
}
 const webpackRules = merge.smart({
          rules: module2.module.rules
        }, {
          rules:module1.module.rules
        });
  // defaultWebpackConfig.module.rules = webpackRules.rules;
console.log(util.inspect(webpackRules,{showHidden:true,depth:5}));

