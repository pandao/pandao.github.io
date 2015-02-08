var mouseOrTouch = function(mouseEventType, touchEventType) {
    mouseEventType = mouseEventType || "click";
    touchEventType = touchEventType || "touchend";

    var eventType  = mouseEventType;

    try
    {
        document.createEvent("TouchEvent");
        eventType = touchEventType;
    }  
    catch(e) {
    } 

    return eventType;
};

$(function() {
        
    $('a[href*=#]').bind(mouseOrTouch("click", "touchend"), function() {
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
    
    prettyPrint();
    
    var goToTop = $("#go-to-top");
    
    $(window).scroll(function(){
        var top = $(this).scrollTop();
        
        if (top > 180) {
            goToTop.fadeIn();
        } else {
            goToTop.fadeOut();
        }
    });
});