/*
 * tileTemplate
 *
 * @file        tiletemplate.node.js 
 * @description A simple, high performance Javascript template engine.
 * @version     v1.6.0
 * @author      Pandao
 * {@link       https://github.com/pandao/tileTemplate}
 * @updateTime  2016-12-04 15:02:47
 */

"use strict"; 

var tileTemplate = require("./tiletemplate");

tileTemplate.config({
	ext      : "tile.html",
	basePath : "./"
});

/**
 * @description							读取模板文件
 * @param		{String}	filename	文件路径
 * @param		{String}	encoding	文件的编码，默认为 utf-8
 * @return		{String}	file  		返回文件的内容
 */

tileTemplate.readFile = function(filename, encoding) {
	encoding     = encoding || "utf-8";

	var fs       = require('fs');
	var basePath = this.settings.basePath;
	var ext      = "." + this.settings.ext;

	filename = basePath + filename + ext;
    
    var file = ( fs.existsSync(filename) ) ? fs.readFileSync(filename, encoding) : false;

	return file;
};

/**
 * @description							编译嵌套(include)的模板文件的回调函数
 * @param		{String}	filename	文件名，不含扩展名和父级目录路径
 * @param		{String}	data		传入的数据
 * @param		{String}	encoding	文件的编码，默认为 utf-8
 * @return		{String}	result		一个以字符串为形式的函数
 */
        
tileTemplate.compileInclude = function(filename, data, encoding) {

	filename = filename || ""; 
	encoding = encoding || "utf-8";

	var _this     = this;
    var openTag   = this.settings.openTag;
    var closeTag  = this.settings.closeTag; 
	var basePath  = this.settings.basePath; 

    return (function($1, $2, $3) {
        var guid            = (new Date).getTime();
		var includeFilename = $2.replace("('", "").replace("')", "").replace("(\"", "").replace("\")", "");  
		var includeContent  = _this.readFile(includeFilename, encoding); 
		var compile         = _this.compile(includeContent, data, {include: true, name: basePath + includeFilename }).toString().split("\n").join('');

		compile  = compile.replace('anonymous', 'anonymous' + guid);

		compile += ' if (typeof __data__ !== "undefined") { __out__ += anonymous' + guid + '(__data__); }';

		return openTag + " " + compile  + " " + closeTag; 
    });
};

/**
 * @description							         渲染模板文件
 * @param		{String}	filename	         文件名，不含扩展名和父级目录路径
 * @param		{String}	data		         传入的数据
 * @param		{Boolean}	[isModule=false]	 是否定义为模块
 * @param		{String}	encoding	         文件的编码，默认为 utf-8
 * @return		{String}	result		         模板编译后返回的HTML(字符串)
 */

tileTemplate.render = function(filename, data, isModule, encoding) {
    if (typeof isModule === 'undefined') {
        isModule = false;
    }

	filename      = filename || ""; 
	encoding      = encoding || "utf-8";

	var fs        = require('fs');
	var _this     = this;
	var caches    = this.caches; 
	var cached    = this.settings.cached;
	var basePath  = this.settings.basePath;
	var ext       = "." + this.settings.ext;

	var tpl  = ( fs.existsSync(basePath + filename + ext) ) ? fs.readFileSync(basePath + filename + ext, encoding) : filename;

	if ( fs.existsSync(basePath + filename + ext) ) {
		filename = basePath + filename + ext;
	}

	if (cached && typeof caches[filename] !== "undefined") { // use cache
		return caches[filename];
	} else {
		var html = this.compile( tpl, data, { name: filename, isModule : isModule} );
        
        html = isModule ? html : html(data);
		
		if (cached) {
            caches[filename] = html;
        }

		return html;
	}
}; 

/**
 * @description							Express的接口
 * @param		{String}	filePath	文件名，不含扩展名和父级目录路径
 * @param		{String}	data		传入的数据
 * @param		{Function}	callback	回调函数
 * @return		{String}	result		文件流
 */

tileTemplate.__express = function(filePath, data, callback) {
	var fs = require('fs'); 
	
	fs.readFile(filePath, function (err, content) {
		if (err) throw new Error(err);

		var rendered = tileTemplate.render(content.toString(), data); 

		return callback(null, rendered);
	});
}; 

/**
 * @description							Express的支持接口
 * @param		{String}	app			Express的app对象
 * @param		{String}	path		模板的根目录
 * @param		{String}	ext			模板的扩展名
 * @return		{Void}		result		无
 */

tileTemplate.expressInit = function(app, path, ext) {
	this.config({
		basePath : path || "./", 
		ext      : ext  || "tile.html"
	});

	ext = this.settings.ext;

	app.set('views', this.settings.basePath); 
	app.engine(ext, this.__express);
	app.set('view engine', ext);
};

module.exports = tileTemplate;