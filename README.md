# openpack

当 Webpack 编译完之后打开一个浏览器标签页。

它的功能类似于 [open-browser-webpack-plugin](https://www.npmjs.com/package/open-browser-webpack-plugin),但它的默认 URL 是根据 webpack-dev-server 的配置决定的。

## 使用示例

### 打开指定 url

```js
var OpenPackPlugin = require('openpack');
module.exports = {
  plugins:[
    // 会打开 http://localhost:8080
    new OpenPackPlugin('http://localhost:8080')
  ]
};
```

### 指定浏览器

```js
var OpenPackPlugin = require('openpack');
module.exports = {
  plugins:[
    // 使用火狐浏览器打开 http://localhost:8080
    new OpenPackPlugin({
      url:'http://localhost:8080',
      browser:'firefox'
    })
  ]
};
```

### 打开 devServer 的 url

```js
var OpenPackPlugin = require('openpack');
module.exports = {
  devServer:{
    host:'0.0.0.0',
    port:12345
  },
  plugins:[
    // 会打开 http://0.0.0.0:12345
    new OpenPackPlugin()
  ]
};
```

### 以局域网 IP 地址作为 host 打开 url

这样能方便同一局域网的其它设备(例如手机)访问你本机上的 webpack server。

```js
var OpenPackPlugin = require('openpack');
module.exports = {
  devServer:{
    host:'0.0.0.0',
    port:12345
  },
  plugins:[
    // 假设你的局域网地址是 172.16.27.75,则会打开 http://172.16.27.75:8080
    new OpenPackPlugin({
      lan:true
    })
  ]
};
```

## 许可

MIT
