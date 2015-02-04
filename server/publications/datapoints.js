'use strict';

Meteor.reactivePublish('userRoomDataPoints', function(id) {
	/* Temp -> last hour */
	function getLastTempDataPoint(id) {
		var oneHourAgo = new moment().subtract(1, 'h').toDate(),
			datapoint = DataPoints.findOne({
				sensor: id,
				createdAt: {
					$lt: oneHourAgo
				}
			});
		return datapoint;
	}

	/* IR - yesterday's most recent */
	function getLastIRDataPoint(id) {
		var yesterday = new moment().subtract(24, 'h').toDate(),
			datapoint = DataPoints.findOne({
				sensor: id,
				createdAt: {
					$lt: yesterday
				}
			});
		return  datapoint;
	}

	var room = Rooms.findOne({
			_id: id
		}, {
			reactive: true
		}),
		roomSensors = room ? Sensors.find({
			_id: {
				$in: room.sensors
			}
		}) : [],
		ors = [];

	roomSensors.forEach(function(s) {
		var dp;
		if (s.type === 't') {
			dp = getLastTempDataPoint(s._id);
		} else if (s.type === 'i') {
			dp = getLastIRDataPoint(s._id);
		}

		if (dp) {
			ors.push({
				sensor: s._id,
				createdAt: {
					$gte: dp.createdAt
				}
			});
		}

	});

	if (!ors.length) {
		return [];
	}

	return DataPoints.find({
		$or: ors
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
