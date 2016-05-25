# OpenPack

[![dependencies Status](https://img.shields.io/david/lmk123/openpack.svg?style=flat-square)](https://david-dm.org/lmk123/openpack)
[![devDependencies Status](https://img.shields.io/david/dev/lmk123/openpack.svg?style=flat-square)](https://david-dm.org/lmk123/openpack#info=devDependencies)
[![NPM Version](https://img.shields.io/npm/v/openpack.svg?style=flat-square)](https://www.npmjs.com/package/openpack)

Opens a new browser tab when [Webpack](http://webpack.github.io/) loads.

OpenPack is similar to [open-browser-webpack-plugin](https://www.npmjs.com/package/open-browser-webpack-plugin) but with more options and very friendly to use with [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html).

## Usage

All options are optional.

```js
var OpenPackPlugin = require('openpack');
module.exports = {
  // webpack-dev-server's options
  devServer:{
    host: '0.0.0.0',
    port: '12345',
    https: true
  },
  plugins:[
    new OpenPackPlugin({
      browser:'chrome', // which browser you want to open URL.

      url:'https://www.google.com', // which URL you want open.Set this will ignores all below options.

      host: 'localhost', // the host of URL. Default is `devServer.host` or 'localhost'
      lan: true, // if set to true, then host will be a LAN IP address instead, so that other devices in the same LAN can access your server. Note: you must set devServer's host to '0.0.0.0' to enable this feture.
      port: '8080', // the port of URL. Default is `devServer.port` or '8080',
      path: '/index.html?query=string#hash' // the full path of URL. Default is '/'
    })
  ]
};
```

## Example

### Open the devServer URL.

```js
var OpenPackPlugin = require('openpack');
module.exports = {
  devServer:{
    host: '127.0.0.1',
    port: '12345',
    https: true
  },
  plugins:[
    // will open 'https://127.0.0.1:12345/'
    new OpenPackPlugin()
  ]
};
```

### Open devServer URL with LAN IP address

```js
var OpenPackPlugin = require('openpack');
module.exports = {
  devServer:{
    host: '0.0.0.0'
  },
  plugins:[
    // if your LAN IP address is '172.16.27.83', then will open 'http://172.16.27.83:8080/'
    new OpenPackPlugin({
      lan: true
    })
  ]
};
```

### Open a URL you want

```js
var OpenPackPlugin = require('openpack');
module.exports = {
  plugins:[
    // will open 'https://www.google.com/'
    new OpenPackPlugin('https://www.google.com/')
  ]
};
```

## License

MIT
