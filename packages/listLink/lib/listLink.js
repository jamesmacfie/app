'use strict';

Template.listLink.events({
	'click .js-listLink': function() {
		var target = $(event.target),
			routerRef,
			routeParams = {}

		if (!target.data('route')) {
			target = target.parent('.js-listLink');
		}

		routerRef = target.data('route');

		if (target.data('routeparamproperty')) {
			routeParams[target.data('routeparamproperty')] = target.data('routeparamvalue');
		}


		Router.go(routerRef, routeParams);
	}
});
