var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var app = express();
var url = 'https://cnodejs.org/topic/581b0c4ebb9452c9052e7acb';

app.get('/', function (req, res, next) {
    //superagent去抓取页面的内容
    superagent.get(url).end(function (err, sres) {
        //常规的错误处理
        if (err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        items.push({
            title: $('.topic_full_title').text().trim(),
            comment: $('.reply_content').eq(0).text().trim()
        })
        res.send(items);
    });
});

app.listen(8080, function (req, res) {
    console.log('app running at port 8080');
});

