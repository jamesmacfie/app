'use strict';

Template.sensorList.helpers({
		sensorCount: function() {
				return Sensors.find().count();
		}
});
