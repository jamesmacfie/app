'use strict';

AutoForm.addHooks('networkInsertForm', {
	onSuccess: function() {
		// Needs to change - this new Network thing should only happen on first addition
		Session.set('newNetwork', true);
		Router.go('home');
	}
});
