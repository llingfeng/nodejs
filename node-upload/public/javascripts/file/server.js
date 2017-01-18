var http = require('http');
var url = require('url');

function start(route,handler) {
    function onRequest(request,response) {
        console.log("request received");
        var pathName = url.parse(request.url).pathname;
        route(handler,pathName,response,request);
    }

    http.createServer(onRequest).listen(8080);
    console.log('服务已经启动');
}

exports.start = start;


