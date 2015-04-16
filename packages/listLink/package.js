'use strict';

Package.describe({
	name: 'autumn-listlink',
	summary: 'A large link that has a title and a description for use in Autumn apps',
});

Package.onUse(function (api) {
	api.use([
		'templating',
		'iron:router'
	]);

	api.addFiles([
		'lib/listLink.html',
		'lib/listLink.js'
	], ['client']);
});
