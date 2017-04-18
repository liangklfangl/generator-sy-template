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

#babel的env配置
http://babeljs.io/docs/usage/babelrc/#env-option

#我们的[es2015](http://babeljs.io/docs/plugins/preset-es2015/)添加了modules配置的情况
下面是源码：
```js
console.log([1, 2, 3].map(n => n + 1))
```
如果是"commonjs"那么编译后的结果为：
```js
"use strict";
console.log([1, 2, 3].map(function (n) {
  return n + 1;
}));
```
如果是"false"表示不会编译成为任何模块代码，结果为:
```js
console.log([1, 2, 3].map(function (n) {
  return n + 1;
}));
```
如果是"umd"那么结果是:
```js
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.index = mod.exports;
  }
})(this, function () {
  "use strict";
  console.log([1, 2, 3].map(function (n) {
    return n + 1;
  }));
});
```
综上所述，我们的false配置后表示不再打包成为任何的模块代码。这样可以减少很多的模块代码，但是此时也不再支持模块化了,也就`没有模块化的任何功能`!

#去掉所有的pretest使用[babel-pretest-env](https://github.com/liangklfang/babel-preset-env)
[babel-preset-env：你需要的唯一Babel插件](https://segmentfault.com/p/1210000008466178)  [Node.js神器之babel-preset-env](http://www.tuicool.com/articles/YbEfEzz)

#babel打包的loose模式与normal模式
[Babel 6: loose模式](http://www.tuicool.com/articles/RRvYfy7),normal模式使用defineProperty使得原型链上的方法不可以枚举，但是后者直接将类上的方法通过赋值到prototype上：
```js
    "use strict";
    function _classCallCheck(instance, Constructor) { ··· }
    var Point = (function () {
        function Point(x, y) {
            _classCallCheck(this, Point);
            this.x = x;
            this.y = y;
        }
        Point.prototype.toString = function toString() { // (A)
            return "(" + this.x + ", " + this.y + ")";
        };
        return Point;
    })();
```

#presets与plugins的区别
presets，也就是`一堆plugins的预设`，起到方便的作用。如果你不采用presets，完全可以单独引入某个功能，比如以下的设置就会引入编译箭头函数的功能。
```js
{
  "plugins": ["transform-es2015-arrow-functions"]
}
```
那么，还有一些方法是presets中不提供的，这时候就需要单独引入了，介绍几个常见的插件。

transform-runtime:
```js
{
  "plugins": ["transform-runtime", options]
}
```
transform-remove-console:
```js
{
  "plugins": ["transform-remove-console"]
}
```
syntax-trailing-function-commas:
```js
function clownPuppiesEverywhere(
    param1,
    param2,
) { }

clownPuppiesEverywhere(
    'foo',
    'bar',
)
```
允许我们使用尾逗号，下次修改的时候只要修改两行，没啥用~详见[如何区分Babel中的stage-0,stage-1,stage-2以及stage-3（一）](http://www.cnblogs.com/chris-oil/p/5717544.html)

babel-plugin-transform-do-expressions：
该插件用于jsx的if..else语句。
```jsx
const Component = props =>
  <div className='myComponent'>
    {do {
      if(color === 'blue') { <BlueComponent/>; }
      else if(color === 'red') { <RedComponent/>; }
      else if(color === 'green') { <GreenComponent/>; }
    }}
  <\/div>
;
```
transform-async-to-generator:
```js
const sleep = (timeout)=>{
    return new Promise( (resolve, reject)=>{
        setTimeout(resolve, timeout)
    })
}
(async ()=>{
    console.time("async");
    await sleep(3000);
    console.timeEnd("async");
})()
```
transform-async-to-generator主要用来支持ES7中的async和await。再来一个实际点的例子
```js
const fetchUsers = (user)=>{
    return window.fetch(`https://api.douban.com/v2/user/${user}`).then( res=>res.json())
}
const getUser = async (user) =>{
    let users = await fetchUsers(user);
    console.log( users);
}
console.log( getUser("flyingzl"))
```
提示： 由于asycn和await是ES7里面的内容，现阶段不建议使用。为了顺利运行上面的代码，建议用webpack进行编译。

transform-exponentiation-operator
```js
// x ** y
let squared = 2 ** 2;
// 相当于: 2 * 2
let cubed = 2 ** 3;
// 相当于: 2 * 2 * 2
// x **= y
let a = 2;
a **= 2;
// 相当于: a = a * a;
let b = 3;
b **= 3;
// 相当于: b = b * b * b;
```
其中stage-X的知识可以[查看这里](如何区分Babel中的stage-0,stage-1,stage-2以及stage-3（一）)

#presets与plugin的顺序
plugins/presets排序

也许你会问，或者你没注意到，我帮你问了，plugins和presets编译，`也许会有相同的功能，或者有联系的功能，按照怎么的顺序进行编译？`答案是会按照一定的顺序。

具体而言，`plugins优先于presets进行编译`。plugins按照数组的index增序(从数组第一个到最后一个)进行编译。presets按照数组的index倒序(从数组最后一个到第一个)进行编译。[如何写好.babelrc？Babel的presets和plugins配置解析](https://excaliburhan.com/post/babel-preset-and-plugins.html) [babel/notes](https://github.com/babel/notes/blob/master/2016-08/august-01.md#potential-api-changes-for-traversal)

#babel的stage-X分析
Babel 6做了一系列模块化，不像Babel 5一样`把所有的内容都加载`。比如需要编译ES6，我们需要设置presets为"es2015"，也就是`预先加载es6编译的相关模块`，如果需要编译jsx，需要预先加载"react"这个模块。事实上， `”stage-0"是对ES7一些提案的支持`，Babel通过插件的方式引入，让Babel可以编译ES7代码。当然由于ES7没有定下来，所以这些功能随时肯能被废弃掉的。详见[如何区分Babel中的stage-0,stage-1,stage-2以及stage-3（一）](http://www.cnblogs.com/chris-oil/p/5717544.html)








参考资料:

[如何写好.babelrc？Babel的presets和plugins配置解析](https://excaliburhan.com/post/babel-preset-and-plugins.html)

[Exponentiation operator transform](http://babeljs.io/docs/plugins/transform-exponentiation-operator/)

[Do expressions transform](http://babeljs.io/docs/plugins/transform-do-expressions/)

[如何区分Babel中的stage-0,stage-1,stage-2以及stage-3（一）](http://www.cnblogs.com/chris-oil/p/5717544.html)

[ES2017,ES2016,ES2015前面比后面多了plugin而已](https://github.com/babel/babel/tree/master/packages/babel-preset-latest)

[ES2017,ES2016,ES2015区别](http://babeljs.io/docs/plugins/preset-latest/)

[webpack 如何选择 babel 的预设配置?](https://www.mmxiaowu.com/article/5848250bd4352863efb55472)

[Node.js神器之babel-preset-env](http://www.tuicool.com/articles/YbEfEzz)