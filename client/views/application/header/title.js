'use strict';

Template.title.events({
	'click .js-previousPage': function(e, view) {
		Router.go(view.data.prev);
	}
});
