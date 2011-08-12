/**
	jQuery placeholder plugin.
	
	Makes browsers that does not support HTML5 placeholder attribute, preform as a modern browser.
	
	Created by:
		Lasse S¿berg
		06.04.2011
		
**/
(function($) {
	var native_support = ('placeholder' in document.createElement('input'));
	$.fn.placeholder = function(command) {
		if(!native_support) {
			original_val_fn = $.fn.val;
			
			if(command) {
				switch(command) {
					case 'clear':
						this.each(function() {
							var el = $(this)
							if(el.data('isEmpty') || el.val() == el.attr('placeholder')) {
								el.val('');
							}
						});
						$.fn.val = original_val_fn;
					break;
				}
				return this;
			}

			this.each(function() {
				if(!$(this).data('gotPlaceholder')) {
					$(this).focus(function() {
						var el = $(this);
						if(el.data('isEmpty')) {
							el.val('').removeClass('placeholder');
						}
					}).blur(function() {
						var el = $(this);
						if(el.data('isEmpty') || !el.val().length) {
							el.val(el.attr('placeholder')).addClass('placeholder');
						}
					}).keyup(function() {
						var el = $(this);
						el.data('isEmpty', (el.val().length == 0));
					}).data('gotPlaceholder', true);
					
					if(!$(this).val().length || $(this).val() == $(this).attr('placeholder')) {
						$(this).val($(this).attr('placeholder')).addClass('placeholder').data('isEmpty', true);
					}
					
					if (($(this).is('input') || $(this).is('textarea')) && typeof this.form !== 'undefined') {
						$(this.form).submit(function(el){return function(){
							if(el.data('isEmpty') || !el.val().length)
								el.val('').removeClass('placeholder');
						}}($(this)))
					}
				}
			});
			
			$.fn.val = function(a) {
				if (arguments.length == 0 && ($(this).is('input') || $(this).is('textarea'))) {
					if($(this).data('isEmpty'))
						return ''
					else
						return original_val_fn.apply(this,arguments);
				}
				else {
					$(this).data('isEmpty',(a.length == 0))
					return original_val_fn.apply(this,arguments);
				}
			}
		}
		
		return this;
	}
})(jQuery);