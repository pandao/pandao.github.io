console.time('tileTemplate');

var tileTemplate = require("../src/tiletemplate.node");

var data = {
	version: "1.0.0",
	title : "标题XXX",
	avatar : 'http://tp1.sinaimg.cn/2287297600/180/40014697506/1',
	list : []
}; 

var data2 = {
	version: "1.0.0",
	title : "标题2XXX",
	list : []
}; 

var length = 10;

for (var i = 0; i < length; i ++) {
	data.list.push({
		index: (i+1),
		user: '<strong style="color:red">tileTemplate '+(i+1)+'</strong>',
		site: 'https://github.com/pandao/tileTemplate'
	});	
};
    
tileTemplate.tag("em", function(content) { 	
	if(content == 12) {
		return '<img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif" alt="em'+content+'"/>';
	} else {
		return content.toString();
	}
});

tileTemplate.tag("time", function() {
	return " time: "+(new Date).getTime();
}); 

tileTemplate.config("basePath", __dirname + "/tpl");  //默认基本目录

// 扩展 tileTemplate
tileTemplate.extend({
	a : "a",
	add : function(str) {
		console.log("add()");
	}
});

tileTemplate.xxx = "xxxx";

console.log(tileTemplate); 

//console.log(tileTemplate.settings); 

var html = tileTemplate.render("test.tile.html", data);
//console.log(html);

var html2 = tileTemplate.render("<p>title：<%=title%> <%=version%></p>", {
	title : "测试标题", 
	version : "v1.0.0"
});

console.log(html2);

console.log(tileTemplate.render("Hello <%=str%>", {str:"wolrd!"}));

//var compiler = tileTemplate.compile(tileTemplate.readFile("test.tile.html"));

//console.log(compiler.toString());

for (var i=0; i<100; i++) {
	//compiler(data)
}
//console.log(compiler(data));

console.timeEnd('tileTemplate');

var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(html);
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');