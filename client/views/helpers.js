'use strict';

Template.registerHelper('pageTitle', function() {
	return this.title;
});

ReactiveTabs.createInterface({
	template: 'autumnTabs'
});
