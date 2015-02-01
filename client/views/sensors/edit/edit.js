AutoForm.addHooks('sensorItemNameEditForm', {
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


Template.sensorItemNameEdit.helpers({
	test: function() {
		//debugger;
	}
})
