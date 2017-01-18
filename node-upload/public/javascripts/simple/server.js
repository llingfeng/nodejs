var http = require('http');
var url = require('url');

function start(route,handler) {
    function onRequest(request,response) {
        console.log("request received");
        var pathName = url.parse(request.url).pathname;
        var postData = "";
        request.setEncoding("utf8");
        request.addListener('data',function (postDataChunk) {
            postData += postDataChunk;
            console.log("receive post data chunk"+postDataChunk);
        });

        request.addListener('end',function () {
            route(handler,pathName,response,postData);
        });
    }

    http.createServer(onRequest).listen(8080);
    console.log('服务已经启动');
}

exports.start = start;


