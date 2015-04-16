'use strict';

if (Images.find({type: 'r'}).count() === 0) {
	Images.insert({
		default: true,
		url: 'beans.jpg',
		thumbUrl: 'beans--thumb.jpg',
		type: 'r',
		users: []
	});

	Images.insert({
		default: true,
		url: 'car.jpg',
		thumbUrl: 'car--thumb.jpg',
		type: 'r',
		users: []
	});

	Images.insert({
		default: true,
		url: 'cow.jpg',
		thumbUrl: 'cow--thumb.jpg',
		type: 'r',
		users: []
	});

	Images.insert({
		default: true,
		url: 'cups.jpg',
		thumbUrl: 'cups--thumb.jpg',
		type: 'r',
		users: []
	});

	Images.insert({
		default: true,
		url: 'leaf.jpg',
		thumbUrl: 'leaf--thumb.jpg',
		type: 'r',
		users: []
	});

	Images.insert({
		default: true,
		url: 'rocks.jpg',
		thumbUrl: 'rocks--thumb.jpg',
		type: 'r',
		users: []
	});

	Images.insert({
		default: true,
		url: 'table.jpg',
		thumbUrl: 'table--thumb.jpg',
		type: 'r',
		users: []
	});

	Images.insert({
		default: true,
		url: 'trees.jpg',
		thumbUrl: 'trees--thumb.jpg',
		type: 'r',
		users: []
	});

	Images.insert({
		default: true,
		url: 'vespa.jpg',
		thumbUrl: 'vespa--thumb.jpg',
		type: 'r',
		users: []
	});
}

if (Images.find({type: 'u'}).count() === 0) {
	Images.insert({
		default: true,
		url: 'one.jpg',
		thumbUrl: 'one.jpg',
		type: 'u',
		users: []
	});

	Images.insert({
		default: true,
		url: 'two.jpg',
		thumbUrl: 'two.jpg',
		type: 'u',
		users: []
	});

	Images.insert({
		default: true,
		url: 'three.jpg',
		thumbUrl: 'three.jpg',
		type: 'u',
		users: []
	});
}
