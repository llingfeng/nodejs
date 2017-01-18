var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
	content:'貌似也不需要在同一个磁盘下，前提是不进入node环境里，直接cmd外面node xxx.js回车就Ok了',
	id:49640073
});

var options = {
	hostname:'blog.csdn.net',
	port:80,
	path:'/u012862227/comment/submit',
	method:'post',
	headers:{
		'Accept':'application/json, text/javascript', 
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'uuid_tt_dd=2093809696253101219_20160921; bdshare_firstime=1474615896676; Hm_lvt_e85014d0cf0a45b161f1cdb90256e434=1479575152; __utma=17226283.1141242975.1476533914.1481291699.1483197182.3; __utmz=17226283.1483197182.3.3.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; Hm_lvt_8875c662941dbf07e39c556c8d97615f=1483469454; uuid=17425340-d754-40ee-b38e-6b738268fa0b; _ga=GA1.2.1141242975.1476533914; _gat=1; UserName=fengge2014; UserInfo=28pKLUtwoFaG4dBXQsgNOnzqTfr4tqov2S9cx5eIGrCFYyjqTx2h59cpwobgthpM8hKNhDWuNlrNQ%2BoMnbsU6Bc6MXr%2FsOE3gQc2p%2F8qwAx0iWurEbOCrBwsfRpYNM8T5tCkLmGqxyJJiUVGDS%2BP0g%3D%3D; UserNick=whatcodesay; AU=A70; UN=fengge2014; UE="2502851555@qq.com"; BT=1483806253966; access-token=2ab06b96-09c4-423e-a0ad-48e79b69ff84; avh=49640073; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1483799641,1483799725,1483799739,1483799757; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1483806256; dc_tos=ojf48g; dc_session_id=1483806256569',
		'Host':'blog.csdn.net',
		'Origin':'http://blog.csdn.net',
		'Referer':'http://blog.csdn.net/u012862227/article/details/49640073',
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req = http.request(options,function(res){
	console.log('stutas:'+res.statusCode);
	console.log('headers:'+JSON.stringify(res.headers));

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});

	res.on('end',function(){
		console.log('评论完毕');
	});
});

req.on('error',function(e){
	console.log('Error:'+e.message);
});
req.write(postData);
req.end();
