/*
 * tileTemplate
 *
 * @file        tiletemplate.js 
 * @description A simple, high performance Javascript template engine.
 * @version     v1.6.0
 * @author      Pandao
 * {@link       https://github.com/pandao/tileTemplate}
 * @updateTime  2016-12-04 15:02:47
 */

;(function(tileTemplate) {
	if(typeof require === 'function' && typeof exports === "object" && typeof module === "object") {
        // CommonJS/Node.js
		tileTemplate(require, exports, module);
	} else if(typeof define === "function") {
		define(tileTemplate); // AMD/CMD/Sea.js
	} else { 
		tileTemplate(function(){}, window['tileTemplate'] = {}, {});
	}
}(function(require, exports, module) {
	"use strict"; 

	/**
	 * @name       							$
	 * @description							通过ID获取DOM对象
	 * @param		{String}	id         	ID名称
	 * @return		{Mixed}	    return		返回DOM对象或ID
	 */

    function $(id) {        
        return (typeof document !== "undefined") ? document.getElementById(id) : id;
    }

	/**
	 * @name       							trim
	 * @description							扩展String对象的清除两边空格的方法
	 * @return		{String}   return       返回String对象本身
	 */
    
    if (typeof ''.trim !== "function") {
        String.prototype.trim = function () {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        };
    } 
    
    var _this = exports;

	/**
	 * @name       							version
	 * @description							版本号
	 */
    
    exports.version = "1.5.0";

	/**
	 * @name       							tags
	 * @description							存放自定义标签语句的数组
	 */
    
    exports.tags = [];

	/**
	 * @name       							caches
	 * @description							存放缓存的数组
	 */
    
    exports.caches = [];

	/**
	 * @name       							regex
	 * @description							存放正则的对象
	 */
        
    exports.regex = {};

	/**
	 * @name       							extend
	 * @description							扩展对象
	 * @param		{Object}	defaults	要扩展进来的对象
	 * @param		{Object}	options		扩展对象本身
	 * @return		{Object}	options		返回扩展后的对象
	 */
    
    exports.extend = function(defaults, options) { 
        options = options || this;
            
        for (var i in defaults) {
            if(typeof options[i] == "undefined") options[i] = defaults[i];
        }

        return options;
    };

	/**
	 * @name       							settings
	 * @description							配置选项
	 */
        
    exports.settings = {
        debug    : false,  // 是否开启调试功能，默认不开启，在生产环境下，这样能获得更高的性能和速度；开发时，请开启；
        cached   : true,   // 是否开启缓存，默认开启，性能更好
        filter   : true,   // 是否过滤模板中的危险语句等，如alert等
        openTag  : "<%",   // 模板开始标签
        closeTag : "%>"    // 模板结束标签
    };

	/**
	 * @name       							      set
	 * @alias       						      config
	 * @description							      过滤模板中的危险语句
	 * @param		{String|Object}	key|options   模板文件的内容
	 * @param		{String}        value	      模板语句的开始标签 
	 * @return		{String}        result		  返回模板文件的内容
	 */
        
    exports.set = exports.config = function() {
        if(arguments && arguments.length > 1) {     
            this.settings[arguments[0]] = arguments[1];
        } else {
            this.settings = this.extend(this.settings, arguments[0]);
        }
    };

	/**
	 * @name       							htmlEncode
	 * @description							对HTML内容进行编码
	 * @param		{String}	html		HTML内容
	 * @return		{String}	result		返回编码后的HTML内容
	 */
    
    exports.htmlEncode = function(html) {
        return html.replace(/\</igm, "&lt;").replace(/\>/igm, "&gt;").replace(/\"/igm, "&quot;").replace(/\'/igm, "&apos;"); 
    };

	/**
	 * @name       							htmlDecode
	 * @description							对编码后的HTML内容进行解码
	 * @param		{String}	html		编码后的HTML内容
	 * @return		{String}	result		返回解码后HTML内容
	 */
    
    exports.htmlDecode = function(html) {
        return html.replace(/\&lt;/igm, "<").replace(/\&gt;/igm, ">").replace(/\&quot;/igm, "\"").replace(/\&apos;/igm, "'");  
    }; 

	/**
	 * @name       							filter
	 * @description							过滤模板中的危险语句
	 * @param		{String}	tpl			模板文件的内容
	 * @param		{String}	openTag		模板语句的开始标签
	 * @param		{String}	closeTag	模板语句的结束标签
	 * @return		{String}	result		返回模板文件的内容
	 */
    
    exports.filter = function(tpl, openTag, closeTag) {  
        tpl = tpl.replace(/\s*<\s*iframe\s*(.*)\s*>\s*<\s*\/iframe\s*>\s*/igm, "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*alert\s*\(\s*(.*)\s*\)\s*;?\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*confirm\s*\(\s*(.*)\s*\)\s*;?\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*prompt\s*\(\s*(.*)\s*\)\s*;?\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*window\s*(.|;)\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*document\s*(.|;)\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*createElement\s*\(\s*(.*)\s*\)\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*(\\$|jQuery)\s*(.*)\s*\(\s*(.*)\s*\)\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*eval\(\s*(.*)\s*\)\s*(.*)"+closeTag, "igm"), "");
        
        return tpl.trim();
    };

	/**
	 * @name       							compileInclude
	 * @description							编译嵌套(include)的模板文件的回调函数
	 * @param		{String}	data		传入的数据
	 * @return		{String}	result		一个以字符串为形式的函数
	 */
        
    exports.compileInclude = function(data) {
        var openTag        = this.settings.openTag;
        var closeTag       = this.settings.closeTag;
        
        return (function($1, $2, $3) {
            var guid           = (new Date).getTime();
            var id             = $2.replace("('", "").replace("')", "").replace("(\"", "").replace("\")", ""); 
            var includeContent = (typeof $(id) == "string") ? id : ($(id) == null) ? id : $(id).value || $(id).innerHTML;
            var compile        = _this.compile(includeContent, data, {include: true, name: id}).toString().split("\n").join('');

            compile  = compile.replace('anonymous', 'anonymous' + guid);
            compile += ' if (typeof __data__ !== "undefined") { __out__ += anonymous' + guid + '(__data__); }';  
            compile  = openTag + " " + compile  + " " + closeTag;

            return compile;
        });
    };

	/**
	 * @name       							       compile
	 * @description							       编译模板文件
	 * @param		{String}	       tpl		   模板文件的内容
	 * @param		{Object}	       data		   传入的数据
	 * @param		{Object}	       options     配置选项，参数为：include 是否为嵌套的模板，name 模板ID，isModule 是否预编译为 CMD 模块
     * @return      {Function|String}  fn          返回预编译函数或预编译模块的字符串
	 */

    exports.compile = function(tpl, data, options) {
        var guid            = (new Date).getTime();
        var defaults        = {
            include  : false,         // 是否为引入
            name     : "tile" + guid, // 匿名函数 ID
            isModule : false          // 是否定义为模块，Sea.js / Require.js CMD 模块
        };
            
        data                 = data    || {};
        options              = options || {};  
        options              = this.extend(defaults, options);
        
        var include          = options.include;
        var filter           = this.settings.filter;
        var debug            = this.settings.debug;
        var openTag          = this.settings.openTag;
        var closeTag         = this.settings.closeTag;
        var regex            = new RegExp(openTag + "=(.*?)" + closeTag, "igm");                         // or use eval
        var varCommentRegex  = new RegExp(openTag + "=#(.*?)" + closeTag, "igm");                        // variable comment
        var escapeRegex      = new RegExp(openTag + "=@(.*?)" + closeTag, "igm");                        // escape regex
        var lineCommentRegex = new RegExp("\/\/" + openTag + "?\\s*(.*?)\\s*" + closeTag + "?", "igm");  // line comment 
        var tagRegex         = /\s*tag:(\w+):?([\u4e00-\u9fa5]+|\w+|\d+)?\s*/igm;
        var includeRegex     = new RegExp(openTag + "\\s*include\\s*((.*?))\\s*;?\\s*" + closeTag, "igm"); 
        
        var tagRegexHandler = function ($1, $2, $3) {
            var str = (typeof $3 == "undefined") ? _this.tags[$2]() : _this.tags[$2]($3.toString());

            return "'" + str.toString() + "'";
        }; 
        
        this.regex.include = includeRegex;

        tpl = tpl.replace(/(^\s*)|(\s*$)/g, "")                                          // clear spaces
                 .replace(varCommentRegex, function($1, $2) { return "'+'"; })
                 .replace(lineCommentRegex, "")
                 .replace(this.regex.include, this.compileInclude(data))
                 .replace(escapeRegex, function($1, $2) { return "'+__escape(" + $2 + ")+'"; })
                 .replace(regex, function($1, $2) { return "'+" + $2 + "+'"; })
                 .split("\n");
        
        if (debug) {
            for (var i = 0, len = tpl.length; i < len; i++) { 
                tpl[i] = tpl[i].toString().replace(/(^\s*)|(\s*$)/g, "") + "_&_" + openTag + " __line__=" + (i + 1) +"; " + closeTag + "_&_";
            }

            tpl = tpl.join('').split("_&_");
        }

        for (var i = 0, len = tpl.length; i < len; i++) {  
            tpl[i] = tpl[i].trim();
            
            if(filter) tpl[i] = this.filter(tpl[i], openTag, closeTag); 
            
            tpl[i] = "__out__+='" + tpl[i] + "';";
            
            tpl[i] = tpl[i].replace(tagRegex, tagRegexHandler);

            tpl[i] = tpl[i].replace("__out__+='" + openTag, "").replace(closeTag + "';", "").replace("}';", "}");
            tpl[i] = tpl[i].replace(/^__out__\+\=\'\/\/(.*?)\'\;$/, function($1, $2, $3) { return "/* " + $2 + " */"; }).replace("'';';", "'';");
        }
        
        var __escape    = 'function __escape(str) {return str.replace(/[\'|\"|\>|\<|;]?/igm, "");}';
        var objectCount = "function objectCount(data){var total=0;for(var i in data){total++} return total;};";
        var errorHandler = "if (typeof console === 'object') {console.error('[tileTemplate]\\n" + options.name + "\\n\\n[type]\\nRender error\\n\\nmessage: '+e.message+'\\nline: '+(e.line+1));}";
        var debugCode    = "try {" + tpl.join('') + "\n return __out__; } catch(e) { e.line=__line__; if(objectCount(data) > 0) { "+errorHandler+" }}";

        tpl = "var __out__ = '', __line__=0;\n " + ( (debug) ? debugCode : tpl.join('') + "\n return __out__;" ); 

        var vars = [];

        for (var i in data) {
            vars.push(i + ' = __data__.' + i);
        }

        vars = (vars.length > 0) ? 'var ' + vars.join(', ') + ';\n' : '';
        
        var fn = new Function('__data__', __escape + objectCount + vars + tpl);
        
        if (options.isModule) {
            fn = 'define(function(require, exports, module) {module.exports = '+ fn.toLocaleString().replace('anonymous', '') + '})';
        }

        return fn;
    };

	/**
	 * @name                                               render
	 * @description							               渲染模板文件
	 * @param		{String}	       id			       模板ID或直接传入模板内容
	 * @param		{Object}	       data		           传入的数据
	 * @param		{String}	       filename            指定模板名称
	 * @param		{Boolean}	       [isModule=false]	   是否定义为模块
     * @return      {Function|String}  html                返回模板渲染后的 HTML 或预编译模块的字符串
	 */
        
    exports.render = function(id, data, filename, isModule) {
        if (typeof isModule === 'undefined') {
            isModule = false;
        }

        data        = data     || {};
        filename    = filename || "";
            
        var cached  = this.settings.cached;
        var tpl     = (typeof $(id) == "string") ? id : ($(id) == null) ? id : $(id).value || $(id).innerHTML;  
        var tplName = (filename == "") ? id : filename;
        
        if (cached && typeof this.caches[tplName] !== "undefined") { // use cache
            return this.caches[tplName];
        } else {
            var html = this.compile(tpl, data, {
                            name     : (filename == "") ? id : filename, 
                            isModule : isModule
                        })(data);
            
            if (cached) {
                this.caches[tplName] = html;
            }

            return html;
        }
    };

	/**
	 * @name                                tag
	 * @description							自定义模板标签语句
	 * @param		{String}	name		标签的名称 
	 * @param		{Function}	callback    处理标签内容的回调函数
	 * @return		{Void}	    void		无
	 */
        
    exports.tag = function(name, callback) {
        this.tags[name] = callback;
    };

	/**
	 * @name                                clear
	 * @description							清除模板缓存
	 * @param		{String}	id			要清除的模板 ID
	 * @return		{Boolean}	bool		返回 true
	 */
        
    exports.clear = function(id) {
        delete this.caches[id]; 

        return true;
	};
}));