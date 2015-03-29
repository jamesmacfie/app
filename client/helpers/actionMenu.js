'use strict';

(function($) {
	$.fn.extend({
		openActionMenu: function() {
			var inDuration = 300,
				link = this,
				menu = $('#' + this.data('activates')),
				hideMenu = false;

			menu.show(inDuration);

			$(document).on('click.actionMenu', function() {
				if (!hideMenu) {
					hideMenu = true;
					return;
				}
				$(link).closeActionMenu(menu);
			});
		}
	});

	$.fn.extend({
		closeActionMenu: function(menu) {
			var outDuration = 300;

			menu.hide(outDuration);

			$(document).off('click.actionMenu');
		}
	});

})(jQuery);
