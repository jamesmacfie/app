'use strict';

if (SensorTypes.find().count() === 0) {
	SensorTypes.insert({
		code: 'movement',
		name: 'Movement (IR)'
	});

	SensorTypes.insert({
		code: 'temperature',
		name: 'Temperature'
	});
}
