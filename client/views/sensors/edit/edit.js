AutoForm.addHooks('sensorItemEditForm', {
	onSubmit: function() {
		console.log(arguments);
	},
	onSuccess: function(operation, result, template) {
		Router.go('roomList');
	},
	onError: function(operation, error, template) {
		console.log(error);
	}
});


Template.sensorItemEdit.helpers({
	test: function() {
		//debugger;
	}
})
