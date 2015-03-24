(function($) {
	$.fn.extend({
		openModal: function(options) {
			var defaults = {
					opacity: 0.5,
					in_duration: 300,
					out_duration: 200,
					ready: undefined,
					complete: undefined,
					dismissible: true
				},
				modal = this,
				overlay = $('<div class="overlay js-modalOverlay"></div>');

			$('body').append(overlay);

			// Override default options
			options = $.extend(defaults, options);

			if (options.dismissible) {
				$('.js-modalOverlay').click(function() {
					$(modal).closeModal(options);
				});

				// Return on ESC
				$(document).on('keyup.modal', function(e) {
					if (e.keyCode === 27) {   // ESC key
						$(modal).closeModal(options);
					}
				});
			}

			$(modal).find('.modalClose').click(function() {
				$(modal).closeModal(options);
			});

			$('.overlay').css({
				display : 'block',
				opacity : 0
			});

			$(modal).css({
				display : 'block',
				opacity: 0
			});

			$('.overlay').velocity(
				{
					opacity: options.opacity
				},
				{
					duration: options.in_duration,
					queue: false,
					ease: 'easeOutCubic'
				}
			);

			//Ease in from the top
			$(modal).css({
				top: '4%'
			});

			$(modal).velocity(
				{
					top: '10%',
					opacity: 1
				}, {
					duration: options.in_duration,
					queue: false,
					ease: 'easeOutCubic',
					// Handle modal ready callback
					complete: function() {
						if (typeof(options.ready) === 'function') {
							options.ready();
						}
					}
				}
			);


		}
	});

	$.fn.extend({
		closeModal: function(options) {
			var defaults = {
					out_duration: 200,
					complete: undefined
				},
				options = $.extend(defaults, options);

			$('.modal-close').off();
			$(document).off('keyup.modal');

			$('.js-modalOverlay').velocity(
				{
					opacity: 0
				},
				{
					duration: options.out_duration,
					queue: false,
					ease: 'easeOutQuart'
				}
			);

			$(this).fadeOut(options.out_duration, function() {
				$(this).css({
					top: 0
				});

				$('.js-overlay').css({
					display: 'none'
				});

				// Call complete callback
				if (typeof(options.complete) === 'function') {
					options.complete();
				}
				$('.overlay').remove();
			});
		}
	});

	$.fn.extend({
		modal: function(options) {
			return this.each(function() {
				// Close Handlers
				$(this).click(function(e) {
					var modal_id = $(this).attr('href');
					$(modal_id).openModal(options);
					e.preventDefault();
				});
			});
		}
	});
})(jQuery);
