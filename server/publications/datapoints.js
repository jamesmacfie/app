'use strict';


Meteor.publish('sensorDataPoints', function(id) {
	var yesterdaysDate = new moment().subtract(24, 'h').toDate(),
		starDataPoint = DataPoints.find({
			sensor: id,
			createdAt: {
				$lt: yesterdaysDate
			}
		}, {
			sort: {
				createdAt: -1
			},
			limit: 1
		}),
		todaysDataPoints = DataPoints.find({
			sensor: id,
			createdAt: {
				$gt: yesterdaysDate
			}
		}, {
			sort: {
				createdAt: -1
			}
		});
});


Meteor.publish('userRoomDataPoints', function(id) {
	var roomSensors = _.flatten(Rooms.find({
			_id: id
		}).map(function mapHubSensor(r) {
			return r.sensors;
		}));


	return DataPoints.find({
		sensor: {
			$in: roomSensors
		}
	});
});


Meteor.publish('userHubDataPoints', function() {
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

	return DataPoints.find({
		sensor: {
			$in: hubSensors
		}
	});
});
