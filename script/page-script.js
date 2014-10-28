;(function ($) {
    'use strict';
    var $body    = $('html, body'),
        content  = $('#main').smoothState({
            prefetch: true,
            pageCacheSize: 4,
            onStart: {
                duration: 250,
                render: function (url, $container) {
                    content.toggleAnimationClass('is-exiting');
                    $body.animate({
                        scrollTop: 0
                    });
                }
            }
        }).data('smoothState');


$(".top-nav li > a, .flash").on("click", function(e){
      var  x = e.pageX,
           y = e.pageY,
      clickY = y - $(this).offset().top,
      clickX = x - $(this).offset().left,
         box = this;

    var setX = parseInt(clickX);
    var setY = parseInt(clickY);
    $(this).find("svg.flash").remove();
    var disc = $(this).append('<svg class="flash"><circle class="disc" cx="'+setX+'" cy="'+setY+'" r="'+0+'"></circle></svg>');


    var c = $(box).find(".disc");
    c.animate(
      {
        "r" : $(box).outerWidth()
      },
      {
        duration: 600,
        step : function(val){
          c.attr("r", val);
        },
        complete: function() {
          $(this).closest('svg').remove();
        }
      }
    );
  });


  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );