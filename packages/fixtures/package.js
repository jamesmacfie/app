'use strict';

Package.describe({
	name: 'autumn-fixtures',
	summary: 'The default data for the Autumn app',
});

Package.onUse(function (api) {
	api.use([
		'autumn-collections',
		'mongo'
	]);

	api.addFiles([
		'lib/hubs.js',
		'lib/images.js',
		'lib/sensors.js',
		'lib/sensorTypes.js'
	], ['server']);

});
