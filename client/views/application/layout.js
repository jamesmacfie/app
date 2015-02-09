'use strict';

Template.layout.events({
	'click .js-toggleMenu': function() {
		var pageHolder = $('#pageHolder');

		if (pageHolder) {
			pageHolder.toggleClass('menuActive');
		}
	},
	'click .js-hideMenu': function() {
		var pageHolder = $('#pageHolder');

		if (pageHolder) {
			pageHolder.removeClass('menuActive');	
		}
	},
	'click .js-goBack': function() {
		history.back();
	}
})
