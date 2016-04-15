define('pkg_part1', function(require, exports, module){
//------------------------------------------------------------
    
    var a = require('js/engine');

exports.sayHello = function() {
    return 'hello';
};
    
    exports.id = a.id;

//------------------------------------------------------------
});


define('pkg_part2', function(require, exports, module){
//------------------------------------------------------------

exports.sayHello = function() {
    return 'hello2';
};

//------------------------------------------------------------
});
