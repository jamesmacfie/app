'use strict';

Template.sensorSummary.helpers({
	getTemplate: function() {
		switch(this.type) {
			case 't':
				return 'tempSensorSummary';
			case 'i':
				return 'irSensorSummary';
		}
	}
});
