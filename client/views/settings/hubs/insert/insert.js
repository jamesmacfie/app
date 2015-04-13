'use strict';

Template.hubInsert.helpers({
	networks: function() {
		return Networks.find();
	}
});

Template.hubInsert.events({
	'click .js-cancelInsert': function(event, view) {
		$(view.find('.modal')).closeModal();
	},
	'click .js-confirmInsert': function(event, view) {
		FlashMessages.clear();

		var hubId =  $(view.find('[name="hubId"]')).val(),
			name = $(view.find('[name="name"]')).val(),
			network =  $(view.find('[name="network"]')).val(),
			obj = {}

		if (!network || !network.length)  {
			FlashMessages.sendError('Please select the network you want this hub to belong to', {
				autoHide: false
			});
			return;
		}

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

		obj.hubId  = hubId;
		obj.name = name;
		obj.networkId = network;

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

			$(view.find('.modal')).closeModal();
		});
	}
});
