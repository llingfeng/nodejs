function route(handler,pathName,response,postData) {
    console.log("路由请求的路径："+ pathName);
    if(typeof handler[pathName] === 'function'){
        handler[pathName](response,postData);
    }else {
        console.log("请求地址没有对应处理程序");
        response.writeHead(404,{'Content-Type':'text/html'});
        response.write('no handler to request');
        response.end();
    }
}

exports.route = route;