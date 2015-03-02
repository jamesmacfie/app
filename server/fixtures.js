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

if (Images.find().count() === 0) {
	Images.insert({
		default: true,
		url: 'beans.jpg',
		thumbUrl: 'beans--thumb.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'car.jpg',
		thumbUrl: 'car--thumb.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'cow.jpg',
		thumbUrl: 'cow--thumb.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'cups.jpg',
		thumbUrl: 'cups--thumb.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'leaf.jpg',
		thumbUrl: 'leaf--thumb.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'rocks.jpg',
		thumbUrl: 'rocks--thumb.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'table.jpg',
		thumbUrl: 'table--thumb.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'trees.jpg',
		thumbUrl: 'trees--thumb.jpg',
		users: []
	});

	Images.insert({
		default: true,
		url: 'vespa.jpg',
		thumbUrl: 'vespa--thumb.jpg',
		users: []
	});
}
