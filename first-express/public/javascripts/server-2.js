var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var app = express();
var url = 'https://cnodejs.org';

app.get('/', function (req, res, next) {
    //superagent去抓取页面的内容
    superagent.get(url).end(function (err, sres) {
        //常规的错误处理
        if (err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        $("#topic_list .topic_title").each(function (index, element) {
            var $element = $(element);
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            })
        });
        res.send(items);
    });
});

app.listen(8080, function (req, res) {
    console.log('app running at port 8080');
});

