$(function() {
        
    $('a[href*=#]').bind(editormd.mouseOrTouch("click", "touchend"), function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname) 
        {
            var hash = this.hash;
            var target = $(hash);
            target = target.length && target || $('[name=' + hash.slice(1) + ']');

            if (target.length) {
                var offsetTop = target.offset().top;
                $('html,body').animate({scrollTop: offsetTop}, 800);

                return false;
            }
        }
    });

    $('a').click(function() {
        $(this).blur();
    }); 
    
    var goToTop = $("#go-to-top");
    
    $(window).scroll(function(){
        var top = $(this).scrollTop();
        
        if (top > 180) {
            goToTop.fadeIn();
        } else {
            goToTop.fadeOut();
        }
    });
    
    var indexMarkdownEditor;
    
    $.get('./index-en.md', function(md){
        indexMarkdownEditor = editormd("index-editormd", {
            height           : 580,
            markdown         : md,
            tex              : true,
            emoji            : true,
            taskList         : true,
            codeFold         : true,
            searchReplace    : true,
            htmlDecode       : "style,script,iframe",
            flowChart        : true,
            sequenceDiagram  : true,
            onfullscreen     : function() {
                this.editor.css("border-radius", 0).css("z-index", 120);
            },
            onfullscreenExit : function() {
                this.editor.css({
                    zIndex : 10,
                    border : "none",
                    "border-radius" : "5px"
                });
                
                this.resize();
            }
        });
    });
});