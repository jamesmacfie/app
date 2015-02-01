AutoForm.addHooks('roomItemEditForm', {
	onSuccess: function(operation, result, template) {
		Router.go('roomItem', template.data.doc);
	},
	onError: function(operation, error, template) {
		console.log(error);
	}
});
