'use strict';

Template.layout.events({
	'click .js-toggleMainMenu': function() {
		var mainMenu = $('.js-mainMenu'),
			overlay = $('.js-mainMenuOverlay');

		mainMenu.toggleClass('isVisible');
		overlay.toggle();
	},
	'click .js-previousPage': function(e, view) {
		history.back();
		//Router.go(view.data.prev);
	},
	'click .js-openActionMenu': function(e) {
		$(e.target).openActionMenu();
	}
});
