(1) copyFile method can refer to https://github.com/liangklfang/mem-fs-editor,ejs engine is used by default

(2) Set the base root directory for our files. Make sure to always use the node_modules base path instead of the require call only. This is needed because require.resolve also includes the path set in package.json main keys, such as "main":"index.js"! 

```js
const baseRootPath = path.join(path.dirname(require.resolve('react-webpack-template')), '..');
```

(3)in `dev` mode , we also need to invoke updateRule

(4)User must install webpackcc manually!

# yoeman-generator本身也要学习一下，内部有github的用法

# 集成package.json中多种wcf的打包方式

# 但是要完成的是本脚手架要支持react的打包方式！！！

# 民命为universal-generator

# 我们要通过用户设置的style类型等来选择安装特定的loader!

# 我们要求用户自己安装webpackcc,这样就可以使用我们额wcf命令

# 我们让用户配置是否使用css  module,修复cwf

```js
 this.useCssModules = false;
```

# useCssModule传入wcf！

# generatorVersion通过package.json配置

```js
   this.generatedWithVersion = parseInt(packageInfo.version.split('.').shift(), 10);
```

# babel打包去掉注视

#这里使用confiopts.json来判断何种语言应该安装何种包，很好的见小包的大小，提高速度

#copyTpl使用ejs模版，可以参考html-webpack-plugin如何修改引擎的

#如何使用package.json来配置让用户全局安装

#默认添加一个entry到package.json中

#config下不能直接使用config加载test.js而是要区别不同的config

#关于external多看看这个

#copyfiles已经将src/index.html移动过去了，那么我们在程序中是否不需要移动了，也就是app/index.js中

#因为webpackcc的默认路径是dest,所以如果你在配置文件中设置了output.path，那么一定更要在package.json中修改npm run clean清除的文件夹

#直接设置webpack -p在webpack的配置文件中是无法获取到process.env.NODE_ENV的，但是在我们打包的源码中是可以获取到的，所以我们使用了cross-env，这个库可以完成的。可以查看这个issue:https://github.com/webpack/webpack/issues/2537#ref-commit-2e39e0b，我们的cross-env设置了以后我们的配置文件就可以获取到的NODE_ENV，同时我们也要将该值通过definePlugin来传入到源码中进行替换
https://webpack.js.org/guides/production-build/.所以我们最后的结果如下：
```js
  "dist":"cross-env NODE_ENV=production npm run pack",
    "clean": " rimraf dest/*",
    "copy": "copyfiles -f ./src/index.html ./dest && copyfiles -u 1 \"./src/static/**\" ./dest",
    "eslint": "eslint ./src",
    "pack": "npm run clean & npm run copy & wcf --dev  --config ./cfg/dist.js --htmlTemplate ./src/index.html",
    "devServer": "wcf --dev --devServer --config ./cfg/devServer.js --htmlTemplate ./src/index.html",
    "watch": "wcf --dev --watch --config ./cfg/watch.js --htmlTemplate ./src/index.html",
    "test": "cross-env NODE_ENV=test karma start",
    "test:watch": "cross-env NODE_ENV=test karma start --autoWatch=true --singleRun=false --reporters=mocha,coverage"
```
#babel的watch模式每一个终端只能启动一个，所以下面两个打包无法在一个babel中完成
```js
  "watch": "babel src/app  --out-dir generators/app -w",
  "component": "babel src/component  --out-dir generators/component -w",
```
即使设置了也只会监听一个

#不要想着babel会像编译js那样编译json，其实他是采用的也是先删除后copy的方式
```js
    "babelWj":"chokidar \"./src/app/config/wcf.config.json\" -c  \"npm run babelCop\""
 "babelCop" :"babel ./src/app/config/wcf.config.json --out-file ./generators/app/config/wcf.config.json --copy-files",
```
此时babel当json文件变化了也是先删除目的文件夹的文件，然后拷贝过去。所以，我觉得配置文件可以采用js，而不是采用json，然后使用module.export来完成

#babel无法同时watch两个文件夹，然后输出到两个文件夹，所以要开启两个终端
我们解决的方法就是使用了concurrently,见[这里](https://www.zhihu.com/question/49931997?sort=created):
```js
   "concurrent": "concurrently \"npm run watch\" \"npm run component\"",
```
