'use strict';

Package.describe({
	name: 'autumn-graph-methods',
	summary: 'Meteor methods for graphs in Autumn apps',
});

Package.onUse(function (api) {
	api.use([
		'autumn-collections',
		'mongo'
	]);

	api.addFiles([
		'lib/_.js'
	], ['server']);});
