"use strict";

var path = require('path');
var webpack = require("webpack");
var srcPath = path.join(__dirname, "../src");
//Because babel-loader is set in wcf, so configuration below will get ['react-hot-loader','babel-loader']
module.exports = {
	plugins: [new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
	})],
	externals: {
		'jsdom': 'window',
		'cheerio': 'window',
		'react/lib/ExecutionEnvironment': true,
		'react/addons': true,
		'react/lib/ReactContext': 'window',
		'sinon': 'window.sinon'
	},
	//Detail of externals will show:https://webpack.js.org/configuration/externals/#components/sidebar/sidebar.jsx
	//Externals will exclude some files from bundle but from library 
	resolve: {
		alias: {
			actions: path.join(srcPath, '/actions/').split(path.sep).join("/"),
			components: path.join(srcPath, '/components/').split(path.sep).join("/"),
			sources: path.join(srcPath, '/sources/').split(path.sep).join("/"),
			stores: path.join(srcPath, '/stores/').split(path.sep).join("/"),
			styles: path.join(srcPath, '/styles/').split(path.sep).join("/"),
			config: path.join(srcPath, '/config/test.js').split(path.sep).join("/"),
			'react/lib/ReactMount': 'react-dom/lib/ReactMount',
			'react/lib/ReactTestUtils': 'react-dom/lib/ReactTestUtils'
		}
	},
	module: {
		rules: [
			// {
			//   test: /\.jsx$/,
			//   exclude :path.resolve("node_modules"),
			//   use: [{
			//   	loader:'react-hot-loader',
			//   	options:{

			//   	}
			//   }]
			// },
			//           {
			//   test: /\.js$/,
			//   exclude :path.resolve("node_modules"),
			//   use: [{
			//   	loader:'react-hot-loader',
			//   	options:{

			//   	}
			//   }]
			// }
		]
	}
};