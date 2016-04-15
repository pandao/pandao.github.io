//@module_name js/car
//@deps js/engine,...

define('js/car', function(require, exports, module){
//------------------------------------------------------------

var engine = require('js/engine');

exports.run = function(speed) {
    return engine.start(speed);
};



//------------------------------------------------------------
});
