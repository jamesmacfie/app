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

if (Sensors.find().count() === 0) {
		var tempId = Sensors.insert({
				moduleId: 1,
				type: 't'
		});

		var createdAt = new moment();

		DataPoints.insert({
			sensor: tempId,
			value: 21,
			createAt: createdAt.add(30, 's').toDate()
		});

		DataPoints.insert({
			sensor: tempId,
			value: 22,
			createAt: createdAt.add(60, 's').toDate()
		});

		DataPoints.insert({
			sensor: tempId,
			value: 24,
			createAt: createdAt.add(90, 's').toDate()
		});

		DataPoints.insert({
			sensor: tempId,
			value: 23.5,
			createAt: createdAt.add(120, 's').toDate()
		});

		DataPoints.insert({
			sensor: tempId,
			value: 23.5,
			createAt: createdAt.add(150, 's').toDate()
		});

		DataPoints.insert({
			sensor: tempId,
			value: 23,
			createAt: createdAt.add(180, 's').toDate()
		});

		DataPoints.insert({
			sensor: tempId,
			value: 24,
			createAt: createdAt.add(210, 's').toDate()
		});
}

if (Images.find().count() === 0) {
	Images.insert({
		default: true,
		url: 'beans.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'car.jpg',
		users: []
	});
	
	Images.insert({
		default: true,
		url: 'cow.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'cups.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'default.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'leaf.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'rocks.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'table.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'trees.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'vespa.jpg',
		users: []
	});
}
