/**
 *
 * tileTemplate for node.js
 *
 * @FileName: tiletemplate.node.js
 * @Auther: Pandao 
 * @version: 1.0.0
 * @License: MIT
 * Copyright@2014 all right reserved.
 */

var tileTemplate = require("../src/tiletemplate");

tileTemplate.config("basePath", "");

tileTemplate.readFile = function(filename, encoding) {
	encoding = encoding || "utf-8";

	var fs = require('fs');
	var basePath = this.settings.basePath + "/"; 

	return (fs.existsSync(basePath + filename)) ? fs.readFileSync(basePath + filename, encoding) : false;
};

tileTemplate.render = function(filename, data, encoding) {

	filename = filename || ""; 
	encoding = encoding || "utf-8";

	var fs = require('fs');

	var _this    = this;
	var caches   = this.caches;
	var openTag  = this.settings.openTag;
	var closeTag = this.settings.closeTag;
	var cached   = this.settings.cached;
	var basePath = this.settings.basePath + "/"; 
	var tpl      = (fs.existsSync(basePath + filename)) ? fs.readFileSync(basePath + filename, encoding) : filename;

	tpl = tpl.split("\r\n");
	//console.log(tpl, basePath + filename);

	var includeRegex = new RegExp(openTag + "\\s*include((.*?))\\s*;?\\s*" + closeTag, "igm");

	var includeRegexHandler = function($1, $2, $3) {
			
		var includeFilename = $2.replace("('", "").replace("')", "").replace("(\"", "").replace("\")", ""); 
		var includeContent  = fs.readFileSync(basePath + includeFilename, encoding);
		var compile = _this.compile(includeContent, data, {include: true, name: basePath + includeFilename}).toString().split("\n").join('');
		var guid = (new Date).getTime();
		compile = compile.replace('anonymous', 'anonymous'+guid);

		compile += ' if(data) { out += anonymous'+guid+'(data); }'; 

		//console.log("include.compile", compile);

		return openTag +" " + compile  +" "+ closeTag; 
	};

	for (var i = 0, len = tpl.length; i < len; i++) {

		tpl[i] = tpl[i].replace(includeRegex, includeRegexHandler);
	} 

	tpl = tpl.join("\r\n");

	if (fs.existsSync(basePath + filename)) {
		filename = basePath + filename;
	}

	if(cached && typeof caches[filename] !== "undefined") // use cache
	{
		return caches[filename];
	}
	else
	{
		var html = this.compile(tpl, data, { name: filename })(data);
		
		if(cached) caches[filename] = html;
		//console.log("caches", caches);

		return html;
	}
};

module.exports = tileTemplate;