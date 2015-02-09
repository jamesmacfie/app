'use strict';

Template.sensorSummaryBrief.helpers({
	getTemplate: function() {
		console.log(this);
		switch(this.type) {
			case 't':
				return 'tempSensorSummaryBrief';
			case 'i':
				return 'irSensorSummaryBrief';
		}
	}
});
