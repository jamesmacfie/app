'use strict';

Meteor.methods({
	insertDataPoint: function(params) {
		try {
			var sensor = Sensors.findOne({
				shortId: parseInt(params.shortId)
			}),
			shortId = params.shortId,
			value = params.value;

			if (!sensor) {
				console.log('No sensor with the mooduleId `' + shortId + '` found');
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
