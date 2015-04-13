'use strict';

Package.describe({
	name: 'autumn-admin-methods',
	summary: 'Meteor methods for admins in Autumn apps',
});

Package.onUse(function (api) {
	api.use([
		'autumn-collections',
		'mongo'
	]);

	api.addFiles([
		'lib/sensors.js'
	], ['server']);
});
