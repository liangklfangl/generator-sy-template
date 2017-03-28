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