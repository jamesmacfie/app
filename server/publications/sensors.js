'use strict';

Meteor.publish('userHubSensors', function() {
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
				
				return Sensors.find({
						_id: {
								$in: hubSensors
						}
				});
});

Meteor.publish('userRoomSensors', function() {
	var roomHubs = _.flatten(Networks.find({
		users: {
			$in: [this.userId]
		}
	}).map(function mapNetworkId(n) {
		return n._hubs;
	})),
	roomSensors = _.flatten(rooms.find({
		network: {
			$in: roomHubs
		}
	}).map(function mapHubSensor(r) {
		return r.sensors;
	}));

	return Sensors.find({
		_id: {
			$in: RoomSensors
		}
	});
});




Meteor.publish('sensorTypes', function() {
		return SensorTypes.find();
});
