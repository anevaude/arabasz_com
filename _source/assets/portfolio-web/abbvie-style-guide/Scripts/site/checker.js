Modernizr.load([

	{
  	test: Modernizr.cssanimations,
		nope: '/Scripts/polyfills/jquery.rotate.js',
		complete: function () {
			if (!Modernizr.cssanimations) {
					var rotation = function (){
		      $(this).rotate({
		        angle:0,
		        animateTo:360,
		        duration: 2000,
		        callback: rotation,
		        easing: function (x,t,b,c,d) {   
		          return c*(t/d)+b;
		        }
		      });
		    }
		    $('.fa-spin').each(rotation);
			}
    }
	}
	
]);


