'use strict';

Template.datapoint.helpers({
	getTemplate: function() {
		var sensor = Sensors.findOne(this.sensor);
		switch(sensor.type) {
			case 't':
				return 'tempDatapoint';
			case 'i':
				return 'irDatapoint';
		}
	}
});
