module.exports = OpenURL;

var open = require( 'open' );

/**
 * 构造函数
 * @param {String|Object} options
 * @param {String} [options.url] - 要打开的 url。默认为 devServer 指定的配置项
 * @param {String} [options.browser] - 要使用的浏览器
 * @param {Boolean} [options.lan] - 如果为 true,则会使用局域网 IP 地址作为 url 的 host
 * @constructor
 */
function OpenURL( options ) {
  var _options;

  switch ( typeof options ) {
    case 'string':
      _options = { url: options };
      break;
    case 'object':
      _options = options;
      break;
    default:
      _options = {};
      break;
  }

  this.url = _options.url;
  this.browser = _options.browser;
  this.lan = _options.lan;
}

OpenURL.prototype.apply = function ( compiler ) {
  var that = this;
  compiler.plugin( 'done', function doneCb( stats ) {
    remove( stats.compilation.compiler._plugins[ 'done' ], doneCb );

    if ( that.url ) {
      open( that.url );
    } else {

      var host;
      if ( that.lan ) {
        // 寻找电脑的内网地址
        // 方便在同一个局域网内的其它设备访问本机的 webpack server
        var ifaces = require( 'os' ).networkInterfaces();
        var ip = [];
        for ( var key in ifaces ) {
          ifaces[ key ].forEach( obj => {
            var address = obj.address;
            if ( obj.family === 'IPv4' && address !== '127.0.0.1' ) {
              ip.push( address );
            }
          } );
        }
        host = ip[ 0 ];
      }

      var devServer = compiler.options.devServer || {};
      var defaultHost = host || devServer.host || '127.0.0.1';
      var defaultPort = devServer.port || '8080';
      open( 'http://' + defaultHost + ':' + defaultPort, that.browser )
    }
  } );
};

function remove( arr, item ) {
  var index = arr.indexOf( item );
  if ( index >= 0 ) {
    arr.splice( index, 1 );
  }
}
