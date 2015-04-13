'use strict';

Package.describe({
	name: 'autumn-methods',
	summary: 'Meteor methods for Autumn apps',
});

Package.onUse(function (api) {
	api.use([
		'autumn-collections',
		'mongo'
	]);

	api.addFiles([
		'lib/datapoints.js',
		'lib/fakedata.js',
		'lib/hubs.js',
		'lib/networks.js',
		'lib/rooms.js',
		'lib/sensors.js'
	], ['server']);

});
