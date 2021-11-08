const { EWOULDBLOCK } = require('constants');
var https = require('https'),
    http  = require('http'),
    path  = require('path'),
    fs    = require('fs'),
    httpProxy = require('http-proxy');

var port = process.env.PORT || 80;
var targetProtocol = process.env.TARGET_PROTOCOL || 'https';
var targetHost = process.env.TARGET_HOST;
var target = targetProtocol + '://' + targetHost;

var proxy = httpProxy.createProxyServer({
  target: target,
  agent  : https.globalAgent,
  headers: {
    host: targetHost
  }
}).listen(port);

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  console.log({msg: 'request successfully proxied', target: req.url, headers: req.headers, body: req.body, statusCode: res.statusCode});
});

console.log({msg: 'started', 'port': port, target: target});