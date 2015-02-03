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
		}, {
			sort: {
				name: 1,
				createdAt: -1
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
		roomSensors = _.flatten(Rooms.find({
			network: {
				$in: roomHubs
			}
		}).map(function mapHubSensor(r) {
			return r.sensors;
		}));

	return Sensors.find({
		_id: {
			$in: roomSensors
		}
	});
});

Meteor.publish('roomSensors', function(id) {
	var roomSensors = _.flatten(Rooms.find(id).map(function mapHubSensor(r) {
		return r.sensors;
	}));

	return Sensors.find({
		_id: {
			$in: roomSensors
		}
	});
});

Meteor.publish('exclRoomSensors', function(id) {
	var roomHubs = _.flatten(Networks.find({
			users: {
				$in: [this.userId]
			}
		}).map(function mapNetworkId(n) {
			return n._hubs;
		})),
		roomSensors = _.flatten(Rooms.find({
			network: {
				$in: roomHubs
			},
			_id: {
				$nin: [id]
			}
		}).map(function mapHubSensor(r) {
			return r.sensors;
		}));

	return Sensors.find({
		_id: {
			$in: roomSensors
		}
	});
});

Meteor.publish('sensorTypes', function() {
		return SensorTypes.find();
});

Meteor.publish('sensor', function(id) {
	return Sensors.find({
		_id: id
	});
});
