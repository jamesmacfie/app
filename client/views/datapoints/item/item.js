'use strict';

Template.datapoint.helpers({
	getTemplate: function() {
		var sensor = Sensors.findOne(this.sensor);
		switch(sensor.type) {
			case 'temperature':
				return 'tempDatapoint';
			case 'motion':
				return 'irDatapoint';
		}
	}
});
