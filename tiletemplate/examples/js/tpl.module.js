define(function(require, exports, module) {module.exports = function (__data__
/**/) {
function __escape(str) {return str.replace(/['|"|>|<|;]?/igm, "");}function objectCount(data){var total=0;for(var i in data){total++} return total;};var str = __data__.str;
var __out__ = '', __line__=0;
 __out__+='<h1>Hello '+str+'</h1>';__out__+='<p>fasdfasdf</p>';
 return __out__;
}})