;
(function($) {
    'use strict';

    var deBouncer = function($, cf, of, interval) {
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




    //==========================================================================
    //
    //      checkNav()
    //
    //      Checks the page and sets navigation marker in nav and class on body.
    //
    //==========================================================================

    function checkNav() {
        var pathname = window.location.pathname.replace(/\\/g, "");
        $(".mp-nav-link").each(function(index) {
            if (pathname.indexOf($(this).text().toLowerCase()) != -1) {
                var offset = $(this).offset();
                $(this).addClass("current");
            } else if (pathname == "/digital" || pathname == "/interface" || pathname == "/traditional") {
                $('#mp-portfolio').addClass("current");
            }
        });

        // Sets navigation marker (positioned with css)
        if ($(".mp-nav-link.current").length === 0) {
            var idx = $("#index");
            idx.addClass("current");
        }

        // Sets 'page' class on the body element
        $('#body').attr('class', '');
        $('#body').addClass($('.mp-page').attr('data-page'));
    }




    //==========================================================================
    //
    //      checkMobile()
    //
    //      Sniffs if the site is being accessed on a mobile device.
    //      If mobile sets 'is-mobile' class on html and does not initalize the
    //      perfectScrollbar plugin.
    //
    //==========================================================================

    function checkMobile() {
        var is_mobile = ((/Mobile|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ? true : false),
            is_small = ($(window).innerWidth() < 705 ? true : false );

        if (!is_mobile && !is_small) {
            $('html').removeClass('is-mobile');
            $('.mp-scroller, .highlight').perfectScrollbar();
        } else {
            $('html').addClass('is-mobile');
        }
    }



    //==========================================================================
    //
    //      progImg()
    //
    //      Homebrew progressive image loader.
    //
    //==========================================================================

    function progImg() {
        $('.mp-img-loader').each(function() {

            // Checks if image is cached
            function cached(url) {
                var test = document.createElement("img");
                test.src = url;
                return test.complete || test.width + test.height > 0;
            }

            var image = $(this).attr('data-src'),
                elem = $(this),
                img = $('<img />');


            // if image is cached show large version immedatly. if not show
            // low-res image and load large one in hidden div. Once large version
            // is fully loaded fade it in.
            if (cached(image)) {
                elem.css('background-image', 'url(' + image + ')').addClass('img-cached');
            } else {
                img.attr('src', image);
                img.on('load', function() {

                    if ($('html').hasClass('is-mobile')) {
                        elem.css('background-image', 'url(' + image.replace(/([.])\w+/, '-sm.jpg') + ')').addClass('img-loaded');
                    } else {
                        elem.css('background-image', 'url(' + image + ')').addClass('img-loaded');
                    }
                });
            }
        });
    }




    //==========================================================================
    //
    //      init()
    //
    //      Groups several function together so they can be run on page change/update.
    //
    //==========================================================================

    function init(){
        checkMobile();
        checkNav();
        progImg();
    }


    //==========================================================================

    $(function() {
        $('html').removeClass('no-js');
        init();
        $('html').removeClass('no-js');
    });




    //==========================================================================

    $(window).smartresize(function() {
        init();
    });




    //==========================================================================
    //
    //      Toggle for navigation on mobile
    //
    //==========================================================================

    $('#body').on('click', '.mp-mobile', function() {
        $(this).parent().toggleClass('is-open');
        $('.mp-nav-link').on('click', function() {
            $('.mp-nav').removeClass('is-open');
        });
    });




    //==========================================================================
    //
    //      expandImage (expand, collapse)
    //
    //      images in articles/posts will expand to fullscreen on click/tap and
    //      collapse on second click/tap
    //
    //==========================================================================

    const expandImage = {
        expand: function(elem) {
            var item   = elem.find('.mp-post-img'),
                cap    = elem.find('.mp-post-caption').clone().addClass('caption-expanded'),
                bounds = item[0].getBoundingClientRect(),
                clone  = item.clone().appendTo('.mp-content').addClass('is-expanded');

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

    $('body').on('click', '.mp-post-figure', function() {
        expandImage.expand($(this));
    });

    $('body').on('click', '.is-expanded', function() {
        expandImage.collapse();
    });

    //==========================================================================
    //
    //      sets class on body when scrolled, used for floating back button.
    //
    //==========================================================================

    $(document).on("scroll", function(e) {
        if ($(document).scrollTop() > 413) {
            $("#body").addClass("fix-back");
        } else {
            $("#body").removeClass("fix-back");
        }
    });




    //==========================================================================
    //
    //      Animates perview images into header
    //
    //==========================================================================

function imageMorph(elem, $curr) {

    $('.mp-scale').addClass('mp-fade').removeClass('mp-scale');
    var item   = $curr.find(elem),
    bounds = item[0].getBoundingClientRect(),
    box    = $('.mp-content ')[0].getBoundingClientRect(),
    clone  = item.clone().appendTo('.mp-content');

    clone.css({
        'position': 'fixed',
        'top': bounds.top,
        'left': bounds.left,
        'width': bounds.width,
        'height': '120px'
    }).addClass('mp-transitioning');
    if ($(window).innerWidth() >= 705) {
        clone.animate({
            'left': box.left,
            'top': box.top,
            'width': box.width,
            'height': '250px',
            'opacity': '.7'
        }, 500);
    } else {
        clone.animate({
            'left': 0,
            'top': '48px',
            'width': '100%',
            'height': '250px',
            'opacity': '.7'
        }, 500);
    }
}



    //==========================================================================
    //
    //      smoothState
    //
    //      Plugin options for animated page transitions.
    //
    //==========================================================================

    var options = {
            prefetch: true,
            cacheLength: 2,
            scroll: true,
            onBefore: function($currentTarget) {
                if ($currentTarget.hasClass('mp-article-link') && $currentTarget.find('.mp-article-img').length == 1) {
                    imageMorph('.mp-article-img', $currentTarget);
                } else if ($currentTarget.hasClass('mp-portfolio-link')) {
                    imageMorph('.mp-portfolio-image', $currentTarget);
                }
            },
            onStart: {
                duration: 500,
                render: function($container) {
                    $container.addClass('is-exiting');
                    smoothState.restartCSSAnimations();

                }
            },

            onReady: {
                duration: 0,
                render: function($container, $newContent) {
                    $container.removeClass('is-exiting');
                    $container.html($newContent);
                    if ($(window).innerWidth() >= 1000) {
                        $('.mp-scroller').perfectScrollbar();
                    }
                }
            },
            onAfter: function($container, $newContent) {
                init();
            }
        },
        smoothState = $('#main').smoothState(options).data('smoothState');

})(jQuery);
