'use strict';

Meteor.methods({
	insertSensor: function(moduleId, hubId) {
		var sensor = Sensors.findOne({
			moduleId: moduleId
		}),
		sensorHub,
		hub = Hubs.findOne(hubId);

		if (!sensor) {
			return new Meteor.Error(400, 'There\'s no sensor with that ID.');
		}

		sensorHub = Hubs.findOne({
			sensors: {
				$in: [sensor._id]
			}
		});

		if (sensorHub) {
			return new Meteor.Error(400, 'That sensor has already been assigned.');
		}
		if (!hub) {
			return new Meteor.Error(400, 'Please select a hub that this sensor will talk to.');
		}

		Hubs.update(hub._id, {
			$push: {
				sensors: sensor._id
			}
		});
	}
});
