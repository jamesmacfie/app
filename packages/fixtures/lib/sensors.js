'use strict';

if (Sensors.find().count() === 0) {
	Sensors.insert({
		shortId: 1,
		type: 'temperature'
	});

	Sensors.insert({
		shortId: 2,
		type: 'temperature'
	});

	Sensors.insert({
		shortId: 3,
		type: 'motion'
	});
}
