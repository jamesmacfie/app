'use strict';

Package.describe({
	name: 'autumn-collections',
	summary: 'The collections for the Autumn app',
});

Package.onUse(function (api) {
	api.use([
		'aldeed:simple-schema',
		'mongo'
	]);

	api.addFiles([
		'lib/datapoints.js',
		'lib/hubs.js',
		'lib/images.js',
		'lib/networks.js',
		'lib/rooms.js',
		'lib/sensors.js',
		'lib/sensorTypes.js',
	], ['client', 'server']);

	api.export([
		'DataPoints',
		'Hubs',
		'Images',
		'Networks',
		'Rooms',
		'Sensors',
		'SensorTypes',
	], ['client', 'server']);
});
