define(function(require, exports, module) { 
    if(typeof console == "object") console.time('tileTemplate');
    
	var tileTemplate = require('../../src/tiletemplate');
    
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
        
        //console.log("回调输出", "em", content);	
        
        if(content == 12) {
            return '<img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif" alt="em'+content+'"/>';
        } else {
            return content.toString();
        }
    });
    
    tileTemplate.tag("time", function() {
        return " time: " + (new Date).getTime();
    }); 
    
    var compiler = tileTemplate.compile(document.getElementById('test-tpl').innerHTML);
    document.getElementById('output2').innerHTML  = compiler(data);
    document.getElementById('output3').innerHTML  = tileTemplate.render("<%=title%>", data);
    document.getElementById('textarea-tpl').value = tileTemplate.render('textarea-tpl', data);
    
    tileTemplate.set({
        openTag : "{{",
        closeTag : "}}"
    });
    
    // 扩展 tileTemplate
    tileTemplate.extend({
        a : "a",
        add : function(str) {
            if(typeof console == "object") console.log("add()");
        }
    });

    tileTemplate.xxx = "xxxx";

    if(typeof console == "object") console.log(tileTemplate); 

	//var tpl  = tileTemplate.render("test-tpl", data); 
    //tileTemplate.clear("test-tpl");
	var tpl  = tileTemplate.render("test-tpl2", data); 
    //tileTemplate.clear("test-tpl2");
	//tpl  = tileTemplate.render("test-tpl", data);  
     
    document.getElementById('output').innerHTML = tpl;
    
    //console.log(tileTemplate.escape(document.getElementById('output').innerHTML));
    if(typeof console == "object") console.timeEnd('tileTemplate');
});