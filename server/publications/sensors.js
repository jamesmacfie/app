'use strict';

Meteor.publish('userSensors', function() {
		var networkHubs = _.flatten(Networks.find({
						users: {
								$in: [this.userId]
						}
				}).map(function mapNetworkId(n) {
						return n._hubs;
				})),
				hubSensors = _.flatten(Hubs.find({
					network: {
						$in: networkHubs
					}
				}).map(function mapHubSensor(h) {
					return h.sensors;
				}));

				// roomSensors = Rooms.find({
				// 		hub: {
				// 				$in: networks
				// 		}
				// }).map(function mapRoomSensorId(r) {
				// 		return r.sensors;
				// });
				console.log(hubSensors);

				return Sensors.find({
						_id: {
								$in: hubSensors
						}
				});
});

Meteor.publish('sensorTypes', function() {
		return SensorTypes.find();
});
