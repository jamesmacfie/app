'use strict';

Template.sensorList.helpers({
		sensorCount: function() {
				return Sensors.find().count();
		}
});

Template.sensorList.events({
	'click .js-addSensor': function() {
		console.log('add a new sensor');
	}
});
