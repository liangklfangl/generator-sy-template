var path = require('path');
//Because babel-loader is set in wcf, so configuration below will get ['react-hot-loader','babel-loader']
module.exports = {
	module:{
		rules:[
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
}