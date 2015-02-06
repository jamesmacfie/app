'use strict';

/* This needs to be cleaned up somewhat */
Meteor.publish('userDataPoints', function() {
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

	var networkHubs = _.flatten(Networks.find({
				users: {
					$in: [this.userId]
				}
			}).map(function mapNetworkHubsId(n) {
				return n._hubs;
			})
		),
		hubSensors = _.flatten(Hubs.find({
				network: {
					$in: networkHubs
				}
			}).map(function mapHubSensor(h) {
				return h.sensors;
			})
		),
		sensors = Sensors.find({
			_id: {
				$in: hubSensors
			}
		}, {
			sort: {
				name: 1,
				createdAt: -1
			}
		}),
		ors = [];

	sensors.forEach(function(s) {
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
