'use strict';

AutoForm.addHooks('networkInsertForm', {
	onSuccess: function() {
		Router.go('home');
	}
});
