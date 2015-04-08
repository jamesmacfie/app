'use strict';

Template.settings.events({
	'click .js-listLink': function() {
		var target = $(event.target),
			routerRef;

		if (target.data('ref')) {
			routerRef = target.data('ref');
		} else {
			routerRef = target.parent('.js-listLink').data('ref');
		}
		
		Router.go(routerRef);
	}
});
