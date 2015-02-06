'use strict';

Template.roomItem.helpers({
	sensorCount: function() {
		return this.sensors.count();
	}
});
