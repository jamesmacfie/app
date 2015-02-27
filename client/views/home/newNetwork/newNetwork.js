'use strict';

Template.homeNewNetwork.helpers({
	networkHolderClass: function() {
		if (Networks.find().count() === 1) {
			return 'hidden';
		}
		return;
	},
	defaultNetworkValue: function() {
		return Networks.findOne()._id;
	}
});

AutoForm.addHooks('homeNewNetworkHubInsertForm', {
	onSuccess: function(operation, result, template) {
		Router.go('home');
	},
	onError: function(operation, error, template) {
		console.log(error);
	}
});
