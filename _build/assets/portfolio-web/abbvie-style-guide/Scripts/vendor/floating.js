(function($) {
  var triggers = [];
  $.fn.floatingFixed = function(options) {
    options = $.extend({}, $.floatingFixed.defaults, options);
    var r = $(this).each(function() {
      var $this = $(this), pos = $this.position();
      pos.position = $this.css("position");
      $this.data("floatingFixedOrig", pos);
      $this.data("floatingFixedOptions", options);
      triggers.push($this);
    });
    windowScroll();
    return r;
  };

  $.floatingFixed = $.fn.floatingFixed;
  $.floatingFixed.defaults = {
    padding: 0
  };

  var $window = $(window);
  var windowScroll = function() {
    if(triggers.length === 0) { return; }
    var scrollY = $window.scrollTop();
    for(var i = 0; i < triggers.length; i++) {
      var t = triggers[i], opt = t.data("floatingFixedOptions");
      if(!t.data("isFloating")) {
        var off = t.offset();
        t.data("floatingFixedTop", off.top);
        t.data("floatingFixedLeft", off.left);
      }
      var top = top = t.data("floatingFixedTop");
      if(top < scrollY + opt.padding && !t.data("isFloating")) {
        t.css({position: 'fixed', top: opt.padding, left: t.data("floatingFixedLeft"), width: t.width() }).data("isFloating", true);
      } else if(top >= scrollY + opt.padding && t.data("isFloating")) {
        var pos = t.data("floatingFixedOrig");
        t.css(pos).data("isFloating", false);
      }
    }
  };

  $window.scroll(windowScroll).resize(windowScroll);
})(jQuery);