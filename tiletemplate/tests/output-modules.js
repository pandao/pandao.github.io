/**
 * 预编译模板文件为 CMD 模块
 * 
 * @createDate 2016-12-04 14:26:16
 */ 

"use strict";

console.time('tileTemplate');

var fs           = require('fs');
var tileTemplate = require("../src/tiletemplate.node");

var tpl = tileTemplate.render("<h1>Hello <%=str%></h1>\n<p>fasdfasdf</p>", {str:"wolrd!"}, { isModule : true});

// 输出为模块文件
fs.writeFileSync(__dirname + '/../examples/js/' + 'tpl.module.js', tpl, {
    encoding : 'utf-8'
});

console.log(tpl);

console.timeEnd('tileTemplate');