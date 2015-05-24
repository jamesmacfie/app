'use strict';

Template.irDataPoint.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		var sensor = Sensors.findOne(this.sensor);

		return 'Motion (ID: ' + sensor.shortId + ')';
	},
	getValueText: function() {
		return !!parseInt(this.value) ? 'Motion detected' : 'No motion detected';
	},
	displayTime: function() {
		var time = new moment(this.createdAt);

		return time.format('dddd at h:mm a');
	}
});
