'use strict';


Template.title.events({
	'click .js-previousPage': function(e, view) {
		Router.go(view.data.prev);
	},
	'click .js-openActionMenu': function(e) {
		$(e.target).openActionMenu();
	}
});
