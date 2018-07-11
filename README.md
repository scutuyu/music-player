基于react实现的音乐播放器
===

[参考源码](https://github.com/xiaolin3303/react-music-player)
<br/>
[参考视频](https://www.imooc.com/video/15480)
<br/>
手敲，少量复制，目的是复习react，webpack的基本知识
<br/>
视频中的老师使用的react(15.x)和webpack(1.x)的版本比较老，而我使用的版本比较新(react 16.x, webpack 4.x)，所以很多api接口都变了，如果是使用老版本的react和webpack可以参考我的[学习笔记](https://github.com/scutuyu/music-player/wiki/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0)

# build
1. git clone https://github.com/scutuyu/music-player.git
2. cd music-player
3. cnpm start
4. 浏览器输入`http://localhost:3030/`

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