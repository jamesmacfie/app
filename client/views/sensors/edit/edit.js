AutoForm.addHooks('sensorItemNameEditForm', {
	onSuccess: function(operation, result, template) {
		Router.go('roomList');
	},
	onError: function(operation, error, template) {
		console.log(error);
	}
});
