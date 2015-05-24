'use strict';

Meteor.startup(function() {
	Sensors._ensureIndex({shortId: 1});
});
