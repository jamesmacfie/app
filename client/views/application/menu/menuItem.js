'use strict';

Template.menuItem.events({
	'click .mainMenu--item': function() {
		Session.set('prev', null);
	},
	'click .mainManu--logout': function() {
		Session.set('prev', null);
	}
});
