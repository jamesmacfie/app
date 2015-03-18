'use strict';

Template.registerHelper('Schemas', Schemas);

Template.registerHelper('pageTitle', function() {
	return this.title;
});

ReactiveTabs.createInterface({
	template: 'autumnTabs'
});
