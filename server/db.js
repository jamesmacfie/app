'use strict';

Meteor.startup(function() {
	Sensors._ensureIndex({moduleId: 1});
});
