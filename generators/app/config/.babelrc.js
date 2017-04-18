 {
    "presets": [
       ["es2015", { "modules": false }],
        "react",
        "airbnb"
       //Currently contains transforms for all standard syntax that is stage 4 (ES2017)
      // or stage 3. Pretest compile right to left while plugin will left to right
      // Our async function will output without manipulation
    ],
    "plugins": [
       "react-hot-loader/babel",
       //We will not configure this loader in webpack for HMR to handle .js/.jsx file but in .babelrc
       "transform-object-rest-spread",
       //Detail :https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread
       "transform-decorators-legacy"
       //In detail ：https://github.com/liangklfang/babel-plugin-transform-decorators-legacy
    ],
    "env":{
       "test": {
         "plugins":[
            "transform-decorators-legacy",
             "transform-object-rest-spread",
             "istanbul"
         ]
       }
    }
  }

 