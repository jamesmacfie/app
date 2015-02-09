'use strict';

Template.room.helpers({
	sensorCount: function() {
		return this.sensors.count();
	}
});
