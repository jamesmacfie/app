'use strict';

Template.roomSummaryBrief.helpers({
	roomSensors: function() {
		return Sensors.find({
			_id: {
				$in: this.sensors
			}
		});
	}

});
