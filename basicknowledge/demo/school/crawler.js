var http = require('http');
var cheerio = require('cheerio');

var url = 'http://www.imooc.com/learn/348';

function filterChapters(html){
	var $ = cheerio.load(html);

	var chapters = $('.chapter');

	/*[
		{
			chapterTitle:'',
			videos:[
				{id:'',videoTitle:''}
			]
		}
	]*/
	var courserData = [];
	chapters.each(function(item){
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text();
		var videos = chapter.find('.video').find('li');
		var chapterData = {
			chapterTitle:chapterTitle,
			videos:[]
		};
		videos.each(function(item){
			var video = $(this);
			var id = video.find('a').attr('href').split('/')[2];
			var videoTitle = video.text();
			var video = {id:id,videoTitle:videoTitle};
			chapterData.videos.push(video);
		});
		courserData.push(chapterData);
	});
	return courserData;
}

function printCourseData(courserData){
	courserData.forEach(function(item,index){
		var chapterTitle = item.chapterTitle;
		console.log(chapterTitle);
	});
}

http.get(url,function(res){
	var html = '';
	res.on('data',function(data){
		html += data;
	});

	res.on('end',function(){
		var courserData = filterChapters(html);
		printCourseData(courserData);
	});
}).on('error',function(){
	console.log('解析出现异常');
});