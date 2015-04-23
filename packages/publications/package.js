'use strict';

Package.describe({
	name: 'autumn-publications',
	summary: 'Data publications for Autumn apps',
});

Package.onUse(function (api) {
	api.use([
		'autumn-collections',
		'mongo',
		'mrt:reactive-publish'
	]);

	api.addFiles([
		'lib/datapoints.js',
		'lib/hubs.js',
		'lib/images.js',
		'lib/networks.js',
		'lib/rooms.js',
		'lib/sensors.js',
		'lib/sensorTypes.js'
	], ['server']);

});
