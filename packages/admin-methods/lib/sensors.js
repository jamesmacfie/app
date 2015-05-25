'use strict';

Meteor.methods({
	// Should be insert, not add.
	adminAddSensor: function(shortId, type) {
		if (!shortId || !shortId.length) {
			return new Meteor.Error(400, 'You must enter the sensor ID');
		}

		if (!type) {
			return new Meteor.Error(400, 'You must enter the type');
		}

		var sensor = Sensors.findOne({
			shortId: parseInt(shortId)
		}),
		sensorType = SensorTypes.findOne(type);

		if (sensor) {
			return new Meteor.Error(400, 'A sensor with that ID already exists');
		}

		if (!sensorType) {
			return new Meteor.Error(400, 'Invalid sensor type :(');
		}

		return Sensors.insert({
			shortId: shortId,
			type: [sensorType.character]
		});
	}
});
