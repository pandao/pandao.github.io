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
    editormd.mathjaxURL = "http://cdn.bootcss.com/mathjax/2.4.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
    
    $.get('./index.md', function(md){
        indexMarkdownEditor = editormd("index-editormd", {
            height: 580,
            markdown : md,
            mathjax : true,
            previewCodeHighlight : true,
            flowChart : true,
            sequenceDiagram : true
        });
    });
});