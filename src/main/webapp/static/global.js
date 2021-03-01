(function ($) {
    // USE STRICT
    "use strict";

    // WOW JS
    function afterReveal (el) {
        el.addEventListener('animationend', function () {
            $(this).css({
                'animation-name': 'none'
            });
        });
    }
    var wow = new WOW({
        boxClass: 'wow',
        animatedClass: 'animated',
        mobile:  false,
        callback: afterReveal
    });
    wow.init();

})(jQuery);
