'use strict';

Template.roomSensorInsert.helpers({
	selectableSensors: function() {
		return Sensors.find({
			_id: {
				$nin: this.sensors
			}
		}, {
			$sort: {
				name: 1
			}
		}).fetch().map(function(i) {
			var sensorType = SensorTypes.findOne({
				character: i.type
			});
			return _.defaults(i, {
				name: sensorType.name + ' (module ID: ' + i.moduleId + ')'
			});
		});
	},
	displayName: function() {

	}
});

Template.roomSensorInsert.events({
	'click .js-cancelInsert': function(event, view) {
		$(view.find('.modal')).closeModal();
	},
	'click .js-confirmInsert': function(event, view) {
		FlashMessages.clear();

		var sensor =  $(view.find('[name="sensor"]')).val();

		if (!sensor || !sensor.length)  {
			FlashMessages.sendError('Please select the sensor you want to add', {
				autoHide: false
			});
			return;
		}

		Meteor.call('insertRoomSensor', view.data._id, sensor, function(err, result) {
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
