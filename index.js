module.exports = OpenPackPlugin

const open = require('open')

/**
 * 构造函数
 * @param {String|Object} options
 * @param {String} [options.url] - 要打开的 url。如果指定了这个参数,则下面的 protocol、host、port、path 配置会被忽略
 *
 * @param {String} [options.host] - 要打开的 url 的 host,默认为 devServer 指定的 host;若 lan 被设为 true,则会使用局域网 ip 作为 host
 * @param {String|Number} [options.port] - 要打开的 url 的端口,默认为 devServer 指定的端口
 * @param {String} [options.path] - pathname + search + hash,例如 '/test.html?sdf=ds&ef=s#dds'
 *
 * @param {String} [options.browser] - 要使用的浏览器
 * @param {Boolean} [options.lan] - 如果为 true,则会使用局域网 IP 地址作为 url 的 host,同时 options.host 会被忽略
 * @constructor
 */
function OpenPackPlugin(options) {
  let _options

  switch (typeof options) {
    case 'string':
      _options = { url: options }
      break
    case 'object':
      _options = options
      break
    default:
      _options = {}
      break
  }

  this.opend = false
  this.options = _options
}

OpenPackPlugin.prototype.apply = function(compiler) {
  const options = this.options
  const url = options.url,
    browser = options.browser

  compiler.hooks.done.tap('OpenPackPlugin', () => {
    if (this.opend) return
    this.opend = true

    if (url) {
      openURLinBrowser(url, browser)
    } else {
      let protocol,
        host,
        port = options.port,
        path = options.path

      if (options.lan) {
        // 寻找电脑的内网地址
        // 方便在同一个局域网内的其它设备访问本机的 webpack server
        const ifaces = require('os').networkInterfaces()
        const ip = []
        for (const key in ifaces) {
          ifaces[key].forEach(obj => {
            const address = obj.address
            if (obj.family === 'IPv4' && address !== '127.0.0.1') {
              ip.push(address)
            }
          })
        }
        host = ip[0]
      } else {
        host = options.host
      }

      const devServer = compiler.options.devServer || {}
      protocol = 'http' + (devServer.https ? 's' : '')
      if (!host) {
        host = devServer.host || 'localhost'
      }
      if (!port) {
        port = devServer.port || '8080'
      }
      if (!path) {
        path = devServer.openPage || '/'
      }
      if (path[0] !== '/') {
        path = '/' + path
      }

      openURLinBrowser(protocol + '://' + host + ':' + port + path, browser)
    }
  })
}

function openURLinBrowser(url, browser) {
  open(url, browser, function(err) {
    if (err) {
      console.error('[OpenPack] Opened fail:' + url)
    } else {
      console.log('[OpenPack] Opened: ' + url)
    }
  })
}
