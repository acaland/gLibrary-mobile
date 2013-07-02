var url = arguments[0].url;

var net = require('net');

$.wv.evalJS("document.cookie='" + net.shibCookie + "';");
$.wv.url = url;

