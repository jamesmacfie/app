AutoForm.addHooks('fakeSensorDataForm', {
	onSuccess: function(operation, result, template) {
		Router.go('home');
	},
	onError: function(operation, error, template) {
		console.log(error);
	}
});
