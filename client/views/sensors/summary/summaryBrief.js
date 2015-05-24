'use strict';

Template.sensorSummaryBrief.onCreated(function() {
	this.subscribe('latestDataPoint', this.data._id);
});

Template.sensorSummaryBrief.helpers({
	getTemplate: function() {
		switch(this.type) {
			case 'temperature':
				return 'tempSensorSummaryBrief';
			case 'motion':
				return 'irSensorSummaryBrief';
		}
	}
});
