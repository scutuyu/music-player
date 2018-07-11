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

# react中的virtual DOM 和 DOM diff
这两块是react里所特有的，DOM diff的算法是react提出的比较经典的算法，Virtual DOM是react中用来存储DOM信息的一种数据结构，存在与内存中，也就是js的一个对象里面，能够完整的描述一个DOM的结构，DOM diff比较两个Virtual DOM，当数据更新的时候会生成一个新的Virtual DOM ，会和之前的Virtual DOM进行一个DOM diff的操作，找出两个DOM的差异，只去更新必要的变化，有一个生命周期的函数shouldComponentUpdate，返回boolean值，表示是否需要更新，提升系统的效率，判断props是否相等，解决方案: 数据用immutable-js包装，每次对数据进行操作都会返回一个新的immutable对象，方便做数据流的封装，比如撤销操作、后退操作；它提供了一个高效地对比对象一致的方法，在shouldComponentUpdate方法里可以很高效地对比两个对象是否一致

# 错误处理
1. 报错`code ELIFECYCLE`
解决办法：
- npm清理缓存
    cnpm cache clean 
- 删除项目中`node_modules`包
- 安装依赖
    cnpm install
2. 编译正常，浏览器访问报错`Header.jsx:21 Uncaught TypeError: Super expression must either be null or a function, not undefined`
原因：单词拼错，将`class Header extends React.Components` 改为`class Header extends React.Component`

3. 注意react版本，不同版本创建react组件的方式不一样，我使用的react是16.x版，我创建react组件的方式是让类继承自React.Component

4. 点击播放进度条之后，没有效果，原因是：在使用jQuery的选择器选择dom元素时，id选择器的名字写错了，将`player`写成了`palyer`,调试半天，贼尴尬
5. 点击音量后，进度条没有反应，但是声音有变化，原因是音量的单词拼错`e.jPlayer.options.volume`写成了`e.jPlayer.options.volulme`，调试天，贼尴尬
6. constructor构造函数中不需要返回，只需要指定this.state = {}即可

7. npm start 报错如下：
```
✖ ｢wds｣: Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.module has an unknown property 'loaders'. These properties are valid:
   object { exprContextCritical?, exprContextRecursive?, exprContextRegExp?, exprContextRequest?, noParse?, rules?, defaultRules?, unknownContextCritical?,unknownContextRecursive?, unknownContextRegExp?, unknownContextRequest?, unsafeCache?, wrappedContextCritical?, wrappedContextRecursive?, wrappedContextRegExp?, strictExportPresence?, strictThisContextOnImports? }
   -> Options affecting the normal modules (`NormalModuleFactory`).
npm ERR! code ELIFECYCLE
```
原因：webpack 4.x 的配置文件, module.loaders 改为 module.rules

8. npm start 报错如下：
```
Error: Couldn't find preset "es2015" relative to directory "/Users/tuyu/learn/musicplayer/app"
```
原因：babel-loader配置中去掉
```
query: {
    presets: ['react', 'es2015']
}
```
9. 输入loclahost:3000报错，404， 说找不到资源，估计是webpack关于devServer的配置出错
解决：devServer.contentBase的值要改为`./dist`, 出错以前的值是`/dist`

# 不足与反思
1. 本项目中使用回调函数和事件订阅的方式进行组件间通信，有一定的局限性，虽然时间订阅可以有效解决回调函数在组件嵌套比较深的时候的问题，但是当系统比较大时，大量的事件的发布与顶跃，会让代码显得杂乱无章，后续准备用redux来替换
2. 音乐列表的信息加载磁盘文件的内容，后续准备采用爬虫到网上抓取音乐信息
3. 后续会支持播放本地音乐的功能
4. ...