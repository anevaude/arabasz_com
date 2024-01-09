$(document).ready(function(){
	
	if (matchMedia) {
		var mq = window.matchMedia("(min-width: 800px)");
		mq.addListener(WidthChange);
		WidthChange(mq);
	}
	
	
	function WidthChange(mq) {
		if (mq.matches) {
			
			$('.tabs').each(function() {
			
				var elem = $(this);
				
				console.log(elem.children('ul').children('li:first'));
				
				elem.children('section').hide();
				elem.children('section:first').show();
				elem.children('ul').children('li:first').addClass('active');
	
				elem.children('ul').children('li').children('a').click(function(){
					
					elem.children('ul').children('li').removeClass('active');
					$(this).parent().addClass('active');
					var currentTab = $(this).attr('href');
					
					elem.children('section').hide();
					$(currentTab).show();
					return false;
				
				});

			});

			
			} else {
			
				$('.tabs section').show();
			
			}	
			
	}

});
