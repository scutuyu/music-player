基于react实现的音乐播放器
===

[参考视频](https://github.com/xiaolin3303/react-music-player)
[参考源码](https://www.imooc.com/video/15480)
手敲，少量复制，目的是复习react，webpack的基本知识

# 使用webpack打包资源文件-基础

1. 使用`npm init`命令初始化node项目的`package.json`文件
2. 将依赖复制到`package.json`中:
3. 安装依赖`cnpm install`
4. 创建目录结构和文件:app/root.js, index.html, webpack.config.js, dist
5. webpack配置文件webpack.config.js写上基础的配置：
```js
module.exports = {
    entry: 'app/root.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    }
}
```
6. app/root.js中写上测试代码，打印react的版本信息
```js
var react = require('react');
console.log(react.version);
```
7. 在index.html文件中引入打包生成的bundle.js文件
```html
<script src="dist/bundle.js"></script>
```
8. 浏览器输入index.html的地址，在控制台将打印
```log
15.6.2
```
# 使用webpack dev server 和插件的使用-基础
由于使用ES6的语法，在打包资源时将ES6语法转为ES5语法需要使用babel-loader
由于使用了less，css相关的技术，在打包资源时需要 less-loader, css-loader

## 使用 babel-loader , less-loader 和 css-loader

1. 在webpack.config.js配置文件中加上配置`module`配置属性，在属性中加上loader配置
2. 新建app/root.less文件，并为body标签里id为root的dom元素添加css配置
3. 在app/root.js中引入root.less文件
4. 重新编译`webpack`,刷新浏览器，可以看到相应的css样式应用到了文档里

由于每次修改js或者css代码，都需要重新使用命令`webpack`进行打包，并在浏览器里刷新页面，能不能修改文件之后，一保存，webpack自动打包，浏览器自动刷新呢？

## webpack-dev-server监听文件的变化，自动编译和打包,浏览器自动刷新
先记录一个坑：npm start报错
```
throw new Error("`output.path` needs to be an absolute path or `/`.");
```
原因是：output.path需要用绝对路径或者 '/'
解决方法是：
```js
var path = require('path'); 
path : path.join(__dirname, '/dist/');
```
1. 在webpack.config.js文件中引入webpack, path, HtmlWebpackPlugin
2. 返回配置对象中加入属性devtool, plugins,在entry属性中新增几个入口文件，output属性中新增publicPath属性
3. 新建server.js文件，引入webpack, WebpackDevServer, webpack的配置对象
4. 实例化WebpackDevServer, 将webpck和webpack的配置传入，并设置参数对象，然后监听端口，hostip，以及回调函数
5. 在package.json文件的script属性中新增一个start属性，值为'node server'
6. 由于使用了HtmlWebpackPlugin，将通过index.tpl.html生成index.html, 所以需要将原本的index.html改为index.tpl.html
7. 运行`npm start`, 修改root.less文件，保存后，webpack自动编译打包，浏览器实时显示修改的结果，不用手动刷新，以实现热加载的目的

# 错误处理
1. npm start 报错如下：
```
✖ ｢wds｣: Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.module has an unknown property 'loaders'. These properties are valid:
   object { exprContextCritical?, exprContextRecursive?, exprContextRegExp?, exprContextRequest?, noParse?, rules?, defaultRules?, unknownContextCritical?,unknownContextRecursive?, unknownContextRegExp?, unknownContextRequest?, unsafeCache?, wrappedContextCritical?, wrappedContextRecursive?, wrappedContextRegExp?, strictExportPresence?, strictThisContextOnImports? }
   -> Options affecting the normal modules (`NormalModuleFactory`).
npm ERR! code ELIFECYCLE
```
原因：webpack 4.x 的配置文件, module.loaders 改为 module.rules

2. npm start 报错如下：
```
Error: Couldn't find preset "es2015" relative to directory "/Users/tuyu/learn/musicplayer/app"
```
原因：babel-loader配置中去掉
```
query: {
    presets: ['react', 'es2015']
}
```
3. 输入loclahost:3000报错，404， 说找不到资源，估计是webpack关于devServer的配置出错
解决：devServer.contentBase的值要改为`./dist`, 出错以前的值是`/dist`

# 不足与反思
1. 本项目中使用回调函数和事件订阅的方式进行组件间通信，有一定的局限性，虽然时间订阅可以有效解决回调函数在组件嵌套比较深的时候的问题，但是当系统比较大时，大量的事件的发布与顶跃，会让代码显得杂乱无章，后续准备用redux来替换
2. 音乐列表的信息加载磁盘文件的内容，后续准备采用爬虫到网上抓取音乐信息
3. 后续会支持播放本地音乐的功能
4. ...