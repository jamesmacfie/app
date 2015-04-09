'use strict';

if (Sensors.find().count() === 0) {
	Sensors.insert({
		moduleId: 1,
		type: 't'
	});

	Sensors.insert({
		moduleId: 2,
		type: 't'
	});

	Sensors.insert({
		moduleId: 3,
		type: 'i'
	});
}
