var event = require('events').EventEmitter;

var life = new event();

function logsomeing(){
	console.log('dosometing one');
};
//添加监听
life.on('dosometing',logsomeing);

life.on('dosometing',function(){
	console.log('dosometing two');
});

life.on('dosometing',function(){
	console.log('dosometing three');
});

life.emit('dosometing');//触发事件

life.removeListener('dosometing',logsomeing);//移除监听

life.removeAllListeners('dosometing');//移除所有监听

console.log(life.listeners('dosometing').length);//长度