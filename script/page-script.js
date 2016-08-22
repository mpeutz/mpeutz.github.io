;
(function($) {
    'use strict';

    var deBouncer = function($, cf, of, interval) {
        // http://www.hnldesign.nl/work/code/debouncing-events-with-jquery/
        var debounce = function(func, threshold, execAsap) {
            var timeout;
            return function debounced() {
                var obj = this,
                    args = arguments;

                function delayed() {
                    if (!execAsap)
                        func.apply(obj, args);
                    timeout = null;
                }
                if (timeout)
                    clearTimeout(timeout);
                else if (execAsap)
                    func.apply(obj, args);
                timeout = setTimeout(delayed, threshold || interval);
            };
        };
        jQuery.fn[cf] = function(fn) {
            return fn ? this.bind(of, debounce(fn)) : this.trigger(cf);
        };
    };

    deBouncer(jQuery, 'smartresize', 'resize', 100);
    deBouncer(jQuery, 'smartscroll', 'scroll', 100);
    deBouncer(jQuery, 'smartmousemove', 'mousemove', 100);
    deBouncer(jQuery, 'touchpause', 'touchmove', 100);


    function checkNav() {
        var pathname = window.location.pathname.replace(/\\/g, "");
        $(".mp-nav-link").each(function(index) {
            if (pathname.indexOf($(this).text().toLowerCase()) != -1) {
                var offset = $(this).offset();
                // $('.mp-nav-current').animate({'left': offset.left + ($(this).outerWidth() / 2)}, 500);
                $(this).addClass("current");
            } else if(pathname == "/digital" || pathname == "/interface" || pathname == "/traditional") {
                $('#mp-portfolio').addClass("current");
            }
        });

        if ($(".mp-nav-link.current").length === 0) {
            var idx = $("#index");
            // var offset = idx.offset();
            // $('.mp-nav-current').animate({'left': offset.left + (idx.outerWidth() / 2)}, 500);
            idx.addClass("current");
        }

        $('#body').attr('class', '');
        $('#body').addClass($('.mp-page').attr('data-page'));

    }

    $(function() {
        $('.mp-scroller, .highlight').perfectScrollbar();
    });

    $('#body').on('click', '.mp-mobile', function() {
        $(this).parent().toggleClass('is-open');
        $('.mp-nav-link').on('click', function() {
            $('.mp-nav').removeClass('is-open');
        });
    });

    $('body').on('click', '.mp-post-figure', function() {
        expandImage.expand($(this));
    });

    $('body').on('click', '.is-expanded', function() {
        expandImage.collapse();
    });


    const expandImage = {
        expand: function(elem) {
            var item = elem.find('.mp-post-img'),
                cap = elem.find('.mp-post-caption').clone().addClass('caption-expanded'),
                bounds = item[0].getBoundingClientRect(),
                clone = item.clone().appendTo('.mp-content').addClass('is-expanded');

            if (cap !== undefined) {
                $(cap).appendTo(clone);
            }

            clone.attr('data-top', bounds.top).attr('data-left', bounds.left).attr('data-width', bounds.width);
            clone.css({
                'position': 'fixed',
                'top': bounds.top,
                'left': bounds.left,
                'width': bounds.width,
                'height': '300px'
            });
            clone.animate({
                'left': 0,
                'top': 0,
                'width': '100%',
                'height': '100%'
            }, 500);
        },
        collapse: function() {
            var img = $('.is-expanded');
            img.animate({
                'left': img.attr('data-left'),
                'top': img.attr('data-top'),
                'width': img.attr('data-width'),
                'height': '300px'
            }, 500, function() {
                img.remove();
            });
        }
    };

    $(document).on("scroll", function(e) {
        if ($(document).scrollTop() > 413) {
            $("#body").addClass("fix-back");
        } else {
            $("#body").removeClass("fix-back");
        }
    });


    checkNav();

    // function boundless() {
    //
    //         var path = $('.mp-path');
    //         var length = path[0].getTotalLength();
    //         path.css({
    //             'stroke-dasharray': (length * 0.1) + ' ' + (length * 0.9),
    //             'stroke-dashoffset': length
    //         });
    //
    // }


    var options = {
            prefetch: true,
            cacheLength: 2,
            scroll: false,
            onBefore: function($currentTarget) {
                if ($currentTarget.hasClass('mp-article-link') && $currentTarget.find('.mp-article-img').length == 1) {
                    var item = $currentTarget.find('.mp-article-img'),
                        bounds = item[0].getBoundingClientRect(),
                        clone = item.clone().appendTo('.mp-content');
                        console.log(bounds);
                    clone.css({
                        'position': 'absolute',
                        'top': bounds.top - 100,
                        'left': bounds.left - 50,
                        'width': bounds.width,
                        'height': '120px'
                    }).addClass('mp-transitioning');
                    clone.animate({
                        'left': 0,
                        'top': (0 + $(document).scrollTop()),
                        'width': '100%',
                        'height': '400px'
                    }, 500);
                }
            },
            onStart: {
                duration: 500,
                render: function($container) {
                    $container.addClass('is-exiting');
                    //boundless();
                    checkNav();

                    smoothState.restartCSSAnimations();

                }
            },

            onReady: {
                duration: 0,
                render: function($container, $newContent) {
                    $container.removeClass('is-exiting');

                    $container.html($newContent);
                    $('.mp-scroller').perfectScrollbar();
                    checkNav();
                    //boundless();
                }
            }
        },
        smoothState = $('#main').smoothState(options).data('smoothState');

    //boundless();

})(jQuery);
