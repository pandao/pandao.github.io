/**
 *
 * tileTemplate
 *
 * @FileName: tiletemplate.js
 * @Auther: Pandao 
 * @version: 1.4.0
 * @License: MIT
 * Copyright@2014 all right reserved.
 */

;(function(tileTemplate) {

	// CommonJS/Node.js
	if(typeof require === 'function' && typeof exports === "object" && typeof module === "object") 
	{
		tileTemplate(require, exports, module);
	}	
	// AMD/CMD/Sea.js
	else if(typeof define === "function") 
	{
		define(tileTemplate);
	} 
	else
	{ 
		tileTemplate(function(){}, window['tileTemplate']={}, {}); 
	}

}(function(require, exports, module) {
    
	"use strict"; 
    
    var $     = function (id) {        
        return (typeof document !== "undefined") ? document.getElementById(id) : id;
    };
    
    if(typeof ''.trim !== "function") {  
        String.prototype.trim = function () {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
    } 
    
    var _this = exports;
    
    exports.version = "1.0.0";
    
    exports.tags    = [];
    
    exports.caches  = [];
        
    exports.regex   = {};
    
    exports.extend  = function(defaults, options) { 
        
        options = options || this;
            
        for (var i in defaults) {
            if(typeof options[i] == "undefined") options[i] = defaults[i];
        }

        return options;
    };
    
    exports.htmlEncode   = function(html) {
        return html.replace(/\</igm, "&lt;").replace(/\>/igm, "&gt;").replace(/\"/igm, "&quot;").replace(/\'/igm, "&apos;"); 
    };
    
    exports.htmlDecode = function(html) {
        return html.replace(/\&lt;/igm, "<").replace(/\&gt;/igm, ">").replace(/\&quot;/igm, "\"").replace(/\&apos;/igm, "'");  
    }; 
        
    exports.settings = {
        debug    : false,
        cached   : true,
        filter   : true,
        openTag  : "<%",
        closeTag : "%>"
    };
        
    exports.set      = exports.config = function() {
            
        if(arguments && arguments.length > 1)
        {     
            this.settings[arguments[0]] = arguments[1];
        }
        else 
        {
            this.settings = this.extend(this.settings, arguments[0]);
        } 

    };
    
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
        
    exports.compileInclude = function(data) {
        
        var openTag        = this.settings.openTag;
        var closeTag       = this.settings.closeTag;
        
        return (function($1, $2, $3) {
    
            var guid           = (new Date).getTime();
            var id             = $2.replace("('", "").replace("')", "").replace("(\"", "").replace("\")", ""); 
            var includeContent = (typeof $(id) == "string") ? id : ($(id) == null) ? id : $(id).value || $(id).innerHTML;
            var compile        = _this.compile(includeContent, data, {include: true, name: id}).toString().split("\n").join('');

            compile            = compile.replace('anonymous', 'anonymous' + guid);
            compile           += ' if(data) { out += anonymous' + guid + '(data); }';  

            return openTag + " " + compile  + " " + closeTag;
        });
    };
        
    exports.compile  = function(tpl, data, options) {
        
        var guid           = (new Date).getTime();
        var defaults = {
            include: false, 
            name : "tile" + guid
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
        
        var tagRegexHandler = function($1, $2, $3) {

            var str = (typeof $3 == "undefined") ? _this.tags[$2]() : _this.tags[$2]($3.toString());

            return "'" + str.toString() + "'";
        }; 
        
        this.regex.include = includeRegex;

        tpl = tpl.replace(/(^\s*)|(\s*$)/g, "")                                          // clear spaces
                 .replace(varCommentRegex, function($1, $2) { return "'+'"; })
                 .replace(lineCommentRegex, "")
                 .replace(this.regex.include, this.compileInclude(data))
                 .replace(escapeRegex, function($1, $2) { return "'+_escape(" + $2 + ")+'"; })
                 .replace(regex, function($1, $2) { return "'+" + $2 + "+'"; })
                 .split("\n");
        
        if (debug)
        {
            for (var i = 0, len = tpl.length; i < len; i++)
            { 
                tpl[i] = tpl[i].toString().replace(/(^\s*)|(\s*$)/g, "") + "_&_" + openTag + " _line=" + (i + 1) +"; " + closeTag + "_&_";
            }

            tpl = tpl.join('').split("_&_");
        }

        for (var i = 0, len = tpl.length; i < len; i++)
        {  
            tpl[i] = tpl[i].trim();
            
            if(filter) tpl[i] = this.filter(tpl[i], openTag, closeTag); 
            
            tpl[i] = "out+='" + tpl[i] + "';";
            
            tpl[i] = tpl[i].replace(tagRegex, tagRegexHandler);

            tpl[i] = tpl[i].replace("out+='" + openTag, "").replace(closeTag + "';", "").replace("}';", "}");
            tpl[i] = tpl[i].replace(/^out\+\=\'\/\/(.*?)\'\;$/, function($1, $2, $3) { return "/* " + $2 + " */"; }).replace("'';';", "'';");
        }         
        
        var _escape = 'function _escape(str) {return str.replace(/[\'|\"|\>|\<|;]?/igm, "");}';
        var objectCount = "var objectCount = function(data){var total=0;for(var i in data){total++} return total;};";
        var errorHandler = "if(typeof console == 'object') console.error('[tileTemplate]\\n" + options.name + "\\n\\n[type]\\nRender error\\n\\nmessage: '+e.message+'\\nline: '+(e.line+1));";
        var debugCode    = "try {" + tpl.join('') + "\n return out; } catch(e) { e.line=_line; if(objectCount(data) > 0) { "+errorHandler+" }}";

        tpl = "var out = '', _line=0;\n " + ( (debug) ? debugCode : tpl.join('') + "\n return out;" ); 

        var extract = 'function extract(obj, parent) {' +
                      'for (var i in obj) { ' +
                      'parent[i] = obj[i];' +
                      '}'+
                      '}';
        
        var fn = new Function('data', _escape + objectCount + extract + 'extract(data, this);' + tpl); 

        return fn;
    };
        
    exports.render = function(id, data, filename) {
        
        data     = data     || {};
        filename = filename || "";
            
        var cached  = this.settings.cached;
        var tpl     = (typeof $(id) == "string") ? id : ($(id) == null) ? id : $(id).value || $(id).innerHTML;  
        var tplName = (filename == "") ? id : filename;
        
        if(cached && typeof this.caches[tplName] !== "undefined") // use cache
        {
            return this.caches[tplName];
        }
        else
        {
            var html = this.compile(tpl, data, { name: (filename == "") ? id : filename })(data);
            
            if(cached) this.caches[tplName] = html;

            return html;
        }
    };
        
    exports.tag = function(name, callback) {
        this.tags[name] = callback;
    };
        
    exports.clear = function(id) {
        delete this.caches[id]; 

        return true;
	}; 
    
}));