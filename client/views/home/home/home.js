'use strict';

Template.home.helpers({
	hasSensors: function() {
		// Do we have a'show on homepage' flag?
		return Sensors.find().count();
	}
});
