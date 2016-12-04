"use strict"; 

var express		 = require('express');
var app			 = express(); 
var tileTemplate = require("../src/tiletemplate.node");

console.time('tileTemplate');

var data = {
	version : "1.0.0",
	title   : "标题XXX",
	avatar  : 'http://tp1.sinaimg.cn/2287297600/180/40014697506/1',
	avatar2 : 'http://tp1.sinaimg.cn/2287297600/180/40014697506/1" onload="alert(123)',
	list    : []
};  

for (var i = 0; i < 10; i ++) {
	data.list.push({
		index: (i+1),
		user: '<strong style="color:red">tileTemplate '+(i+1)+'</strong>',
		site: 'https://github.com/pandao/tileTemplate'
	});	
};
    
// 设置表情标签
tileTemplate.tag("em", function(content) { 	
	if (content == 12) {
		return '<img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif" alt="em'+content+'"/>';
	} else {
		return content.toString();
	}
});

    
// 设置时间戳标签
tileTemplate.tag("time", function() {
	return " time: " + (new Date).getTime();
});  

// 初始化Express支持
tileTemplate.expressInit(app, __dirname + "/tpl/");

app.get('/', function (req, res) {
	res.render('index', data);
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

console.timeEnd('tileTemplate');
