$(document).ready(function() {
	
    if (ww < 800) { // if device width is LT 800
        $('.toggleMenu').css('display', 'inline-block');
        $('.nav li a').click(function() {
            $(this).parent('li').toggleClass('hover');
        });
    } else {
        $('.toggleMenu').css('display', 'none');
        $('.nav li').hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });
    }
    
    
    /* Amerideals Button */
	$('.deal button').click(function() {
		var elem = $(this);
		
		elem.toggleClass('button-clicked');
		if (elem.text() === 'Select') {
			elem.text('Activated');
		} else {
			elem.text('Select');
		}
		
	});
	
	
	$('.show-hide').each(function(){
		var elem = $(this);
		elem.on('click', function(){
			var item = $(this),
			sibling = item.parent('.deal-description-short').siblings('.deal-description-long');
			
			if (item.text() === "Show More") {
				sibling.slideDown(600);
				item.text('Show Less');
			} else {
				sibling.slideUp(375);
				item.text('Show More');
			}			
		});

	});
	
 
});


/* TutsNav */

var ww = document.body.clientWidth;

$(document).ready(function() {
	$('#tutsNav .nav li a').each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass('parent');
			console.log($(this));
		};
	})
	
	$('#tutsNav .toggleMenu').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.nav').toggle();
	});
	
	adjustMenu();
	
})

$(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	
});

var adjustMenu = function() {
	if (ww < 768) {
		
		if (!$('body').hasClass('homepage')) {
			$('#tutsNav').hide();
		}
	
	  $('#toggleMenu').click(function(e) {
			e.preventDefault();
			$('#tutsNav').slideToggle();
		});
		
	
	
		$('.toggleMenu').css('display', 'inline-block');
		if (!$('.toggleMenu').hasClass('active')) {
			// $('.nav').hide();  OFF because we're not using the ToggleMenu. Menu always open.
			$('.nav').show();
		} else {
			$('.nav').show();
		}
		$('#tutsNav .nav li').unbind('mouseenter mouseleave');
		$('#tutsNav .nav li a.parent').unbind('click').bind('click', function(e) {
			// must be attached to anchor element to prevent bubbling
			e.preventDefault();
			$(this).parent('li').toggleClass('hover');
		});
		
	} 
	else if (ww >= 768) {
		
		$('#tutsNav').show();
	
	
	
		$('.toggleMenu').css('display', 'none');
		$('#tutsNav .nav').show();
		$('#tutsNav .nav li').removeClass('hover');
		$('#tutsNav .nav li a').unbind('click');
		$('#tutsNav .nav li').unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	$(this).toggleClass('hover');
		});
	}
}