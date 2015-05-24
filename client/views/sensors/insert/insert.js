'use strict';

Template.sensorInsert.helpers({
	hasMoreThanOneHub: function() {
		return !!Hubs.find().count();
	},
	hub: function() {
		return Hubs.findOne();
	},
	hubs: function() {
		return Hubs.find();
	}
});

Template.sensorInsert.events({
	'click .js-cancelAdd': function(event, view) {
		$(view.find('.modal')).closeModal();
	},
	'click .js-confirmAdd': function(event, view) {
		FlashMessages.clear();

		var shortId = parseInt($(view.find('[name="shortId"]')).val()),
			hub =  $(view.find('[name="hub"]')).val();

		if (!shortId || isNaN(shortId))  {
			FlashMessages.sendError('Please enter the sensors ID', {
				autoHide: false
			});
			return;
		}

		if (!hub || !hub.length)  {
			FlashMessages.sendError('Please select the hub this sensor will belong to', {
				autoHide: false
			});
			return;
		}


		Meteor.call('insertSensor', shortId, hub, function(err, result) {
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
