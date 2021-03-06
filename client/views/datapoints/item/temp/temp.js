'use strict';

Template.tempDatapoint.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		var sensor = Sensors.findOne(this.sensor);

		return 'Temperature (ID: ' + sensor.shortId + ')';
	},
	displayTime: function() {
		var time = new moment(this.createdAt);

		return time.format('dddd at h:mm a');
	}
});
