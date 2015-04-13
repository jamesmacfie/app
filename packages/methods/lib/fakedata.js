'use strict';

Meteor.methods({
	insertFakeTempData: function(id, config) {
		var options = {
			range: 5,
			start: 20,
			time: 120
		},
		tempSensor = Sensors.findOne({
			_id: id
		});

		if (!tempSensor) {
			throw new Error('No sensor found');
		}

		_.extend(options, config);

		for (var i = 0, len = options.time; i < len; i++) {
			DataPoints.insert({
				sensor: id,
				value: Math.ceil(Math.random() * options.range) + options.start,
				createdAt: new moment().subtract(i, 'm').toDate()
			});
		}
	}
});
