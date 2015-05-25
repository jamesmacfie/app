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
				type: 'temperature',
				createdAt: new moment().subtract(i, 'm').toDate()
			});
		}
	},

	insertFakeIrData: function(id) {
		moment().utc();
		var irSensor = Sensors.findOne({
				_id: id
			}),
			hourSubtract = Math.floor(Math.random() * 10),
			minuteSubtract = Math.floor(Math.random() * 60),
			randomDate = new moment().subtract(hourSubtract, 'h').subtract(minuteSubtract, 'm');

		if (!irSensor) {
			throw new Error('No sensor found');
		}

		DataPoints.insert({
			sensor: id,
			value: 1,
			type: 'motion',
			createdAt: randomDate.toDate()
		});

		DataPoints.insert({
			sensor: id,
			value: 0,
			createdAt: randomDate.add(10, 's').toDate()
		});

	}
});
