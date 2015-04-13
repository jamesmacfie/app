'use strict';

Meteor.methods({
	insertDataPoint: function(params) {
		try {
			var sensor = Sensors.findOne({
				moduleId: parseInt(params.moduleId)
			}),
			moduleId = params.moduleId,
			value = params.value;

			if (!sensor) {
				console.log('No sensor with the mooduleId `' + moduleId + '` found');
				return;
			}

			if (value === undefined) {
				console.log('A dataPoint value needs to be passed through');
				return;
			}

			DataPoints.insert({
				sensor: sensor._id,
				value: value
			});

		} catch(e) {
			console.log('Something went terribly wrong' + e.message);
		}
	}
});
