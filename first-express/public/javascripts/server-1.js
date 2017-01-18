//引入依赖
var express = require('express');
//调用 utility.md5 方法，得到 md5 之后的值
var utility = require('utility');
//创建express的实例
var app = express();

app.get('/',function (req,res) {
    var q = req.query.q;
    var md5 = utility.md5(q);
    var sha1 = utility.sha1(q);
    res.send('md5:'+md5+"sha1:"+sha1);
});

app.listen(8080,function (req,res) {
    console.log('app is running at port 8080');
})
