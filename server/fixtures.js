'use strict';

if (SensorTypes.find().count() === 0) {
		SensorTypes.insert({
				character: 'i',
				name: 'Movement (IR)'
		});

		SensorTypes.insert({
				character: 't',
				name: 'Temperature'
		});
}

// if (Sensors.find().count() === 0) {
// 		Sensors.insert({
// 				moduleId: 1,
// 				type: 't'
// 		});
// }
