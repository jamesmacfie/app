'use strict';

Template.adminAddSensor.events({
	'click .js-insertSensor': function(event, view) {
		var moduleInput = $(view.find('[name="moduleId"]')),
			moduleId = moduleInput.val().trim(),
			typeInput = $(view.find('[name="type"]')),
			type = typeInput.val();

		FlashMessages.clear();

		// Validation
		if (!moduleId.length) {
			FlashMessages.sendError('You need to enter the moduleId.', {
				autoHide: false
			});
			return;
		}

		Meteor.call('adminAddSensor', moduleId, type, function(err, result) {
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

			moduleInput.val('');
			FlashMessages.sendSuccess('Sensor with new ID ' + result + ' added!', {autoHide: false});
		});
	}
});
