'use strict';

Template.welcomeHubInsert.helpers({
	networkName: function() {
		return Networks.findOne().name;
	},
	networkId: function() {
		return Networks.findOne()._id;
	}
});

Template.welcomeHubInsert.events({
	'click .js-confirmInsert': function(event, view) {
		FlashMessages.clear();

		var hubId = $(view.find('[name="hubId"]')).val(),
			name = $(view.find('[name="name"]')).val(),
			networkId = $(view.find('[name="networkId"]')).val(),
			obj = {};

		if (!hubId || !hubId.length)  {
			FlashMessages.sendError('Please enter the ID from the hub you wish to add', {
				autoHide: false
			});
			return;
		}

		if (!name || !name.length)  {
			FlashMessages.sendError('Please give your new hub a memorable name', {
				autoHide: false
			});
			return;
		}

		if (!networkId || !networkId.length)  {
			FlashMessages.sendError('Something\'s gone wrong... redirecting', {
				autoHide: false
			});

			setTimeout(function() {
				Router.go('welcomeNetworkInsert');
			}, 500);

			return;
		}

		obj.hubId = hubId;
		obj.networkId = networkId;
		obj.name = name;

		Meteor.call('insertHub', obj, function(err, result) {
			FlashMessages.clear();
			if (err) {
				FlashMessages.sendError('An unknown server error occurred', {
					autoHide: false
				});
				return;
			}

			if (_.isObject(result) && result.error) {
				FlashMessages.sendError(result.reason, {
					autoHide: false
				});
				return;
			}
			Router.go('home');
		});
	}
});
