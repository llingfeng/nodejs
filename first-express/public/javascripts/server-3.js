var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');
var async = require('async');
var app = express();

var cnUrl = 'https://cnodejs.org/';
app.get('/', function (req, res, next) {
    //superagent去抓取页面的内容
    superagent.get(cnUrl).end(function (err, sres) {
        //常规的错误处理
        if (err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var topicUrls = [];
        $("#topic_list .topic_title").each(function (index, element) {
            var $element = $(element);
            var topicUrl = url.resolve(cnUrl,$element.attr('href'));
            topicUrls.push(topicUrl);
        });

        //获得一个eventproxy实例
        var ep = new eventproxy();
        //ep去命令重复的去执行topic-html topicUrls.length次后再去执行回调里面的方法，topics是一个数组，存放每次topic-html后的值
        ep.after('topic-html',topicUrls.length,function (topics) {
            topics = topics.map(function (topic) {
                var topicUrl = topic[0];
                var topicHtml = topic[1];
                var $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment: $('.reply_content').eq(0).text().trim()
                });
            })
            console.log('end:')
            console.log(topics);
        })

        async.mapLimit(topicUrls, 5, function (url, callback) {
            fetchUrl(url, callback);
        }, function (err, result) {
            res.send(result);
        });

        function fetchUrl(url,callback) {
            superagent.get(url).end(function (err, res) {
                if (err) {
                    return console.error(err)
                }
                var topicHtml = res.text;
                ep.emit('topic-html', [url, topicHtml]);
                callback(null, "123");
            });
        }
    });
});

app.listen(8080, function () {
    console.log('app running at port 8080');
});

