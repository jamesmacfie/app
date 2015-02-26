'use strict';

Template.sensorSummaryBrief.helpers({
	getTemplate: function() {
		switch(this.type) {
			case 't':
				return 'tempSensorSummaryBrief';
			case 'i':
				return 'irSensorSummaryBrief';
		}
	}
});
