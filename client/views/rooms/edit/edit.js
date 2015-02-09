'use strict';

AutoForm.addHooks('roomEditForm', {
	onSuccess: function(operation, result, template) {
		Router.go('room', template.data.doc);
	},
	onError: function(operation, error, template) {
		console.log(error);
	}
});
