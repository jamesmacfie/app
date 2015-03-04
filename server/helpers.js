'use strict';

Meteor.autumnUser = {
	networkHubIds: function(userId) {
		return _.flatten(Networks.find({
				users: {
					$in: [userId]
				}
			}).map(function mapNetworkHubsId(n) {
				return n._hubs;
			})
		);
	},
	hubSensorIds: function(userId) {
		var networkHubs = this.networkHubIds(userId);
		return _.flatten(Hubs.find({
				network: {
					$in: networkHubs
				}
			}).map(function mapHubSensor(h) {
				return h.sensors;
			})
		);
	},
	canAccessSensor: function(userId, sensorId) {
		var hubSensors = this.hubSensorIds(userId);

		return hubSensors.indexOf(sensorId) !== -1;
	}
};
