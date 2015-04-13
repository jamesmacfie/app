'use strict';

Meteor.publish('sensorTypes', function() {
	return SensorTypes.find();
});
