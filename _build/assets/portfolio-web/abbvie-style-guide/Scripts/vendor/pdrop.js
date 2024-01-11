/**
 *  @name            pDrop        
 *  @description     A custom dropdown for the patient pages
 *  @author          Nick Snyder (nick@nicksnyder.is)
 *  @copyright       Nick Snyder 2015
 *  @version         1.0
 *  @requires        jQuery 1.11
 */
 
(function($){
	var defaults, methods, options;
	defaults = {	
		select: '.pdrop-select',
		active: '.pdrop-selected-text',
		dropdown: '.pdrop-dropdown',
		item: '.pdrop-item',
		speed: 300
	};
	
	methods = {	
		init: function(options) {
			var settings;
			options = (typeof options === "object") ? options : {};
			settings = $.extend(true, {}, defaults, options);
		
			return this.each(function() {	
				var $el = $('#' + this.id);
				methods._utils.valueGet($el, settings);
				methods._bindDropdown($el, settings);
				methods._bindItemSelection($el, settings);				
			});
		},			
		
		_bindDropdown: function(pd, s) {
			pd.find(s.select).on('click', function() {
				var $clicked = $(this),
				$drop = $clicked.siblings(s.dropdown);				
				(pd.find(s.dropdown).is(':visible')) ? methods._utils.dropClose(pd, s) : methods._utils.dropOpen(pd, s);	
			});
		},		
		
		_bindItemSelection: function(pd, s) {	
			pd.find(s.item).on('click', function() {
				var $clicked = $(this),
				clickedVal = $clicked.attr('data-pdrop-val'),
				$clone = $clicked.clone(),
				$container = pd.find(s.active);
				
				pd.find('.hidden').removeClass('hidden');
				$clicked.addClass('hidden');
				$container.html($clone.html());		
				pd.attr('data-pdrop-val', clickedVal);
				methods._utils.valueSet(pd.attr('id'), clickedVal);
				methods._utils.dropClose(pd, s);		
			});	
		},	
	
		_utils: {
			
			dropOpen: function(pd, s) {
				pd.find(s.dropdown).addClass('active');
				pd.find(s.select).css('z-index', 1000);
				pd.find(s.dropdown).slideDown(s.speed);
			},
			
			dropClose: function(pd, s) {
				pd.find(s.dropdown).removeClass('active');
				pd.find(s.dropdown).slideUp(s.speed / 2);
				pd.find(s.select).css('z-index', 1);	
			},
			
			valueSet: function(id, val) {		
				localStorage.setItem(id, val);
			},
			
			valueGet: function($el, s) {
				var id = $el.attr('id');			
				if (localStorage.getItem(id)) {
					var val = localStorage.getItem(id),
					$item = $el.find('[data-pdrop-val="'+ val +'"]');				
					
					$el.find(s.active).html($item.html());
					$item.addClass('hidden');
					$el.attr('data-pdrop-val', val);						
				} else {			
					$el.find(s.active).html('Please choose a status');
				}		
			}	
		}	
	};
	
	$.fn.pdrop = function(method) {
		if ( methods[method] ) {
		  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on pDrop' );
		}    
	};
})(jQuery);