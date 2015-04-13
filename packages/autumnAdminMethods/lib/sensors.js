'use strict';

Meteor.methods({
	// Should be insert, not add.
	adminAddSensor: function(moduleId, type) {
		if (!moduleId || !moduleId.length) {
			return new Meteor.Error(400, 'You must enter the module ID');
		}

		if (!type) {
			return new Meteor.Error(400, 'You must enter the type');
		}

		var sensor = Sensors.findOne({
			moduleId: parseInt(moduleId)
		}),
		sensorType = SensorTypes.findOne(type);

		if (sensor) {
			return new Meteor.Error(400, 'A sensor with that module ID already exists');
		}

		if (!sensorType) {
			return new Meteor.Error(400, 'Invalid sensor type :(');
		}

		return Sensors.insert({
			moduleId: moduleId,
			type: sensorType.character
		});
	}
});
