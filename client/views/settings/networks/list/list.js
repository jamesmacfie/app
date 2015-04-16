'use strict';

Template.networkList.helpers({
	hubSummary: function() {
		var hubs = Hubs.find({
				_id: {
					$in: this.hubs
				}
			}),
			hubCount = hubs.count(),
			sensorCount = 0;

		hubs.forEach(function(h) {
			sensorCount += h.sensors.length;
		});

		return [hubCount, hubCount > 1 || hubCount === 0 ? 'hubs' : 'hub', 'and', sensorCount, sensorCount > 1  || sensorCount === 0 ? 'sensors' : 'sensor'].join(' ');
	}
});
