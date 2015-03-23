'use strict';

Meteor.publish('latestDataPoint', function(id) {
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
	sensorIds = Sensors.find({
		_id: {
			$in: hubSensors
		}
	}, {
		sort: {
			name: 1,
			createdAt: -1
		}
	}).map(function(s) {
		return s._id;
	});

	if (sensorIds.indexOf(id) === -1) {
		return;
	}

	return DataPoints.find({
		sensor: id
	},
	{
		sort: {
			createdAt: -1
		},
		limit: 1
	});
});

/* This needs to be cleaned up somewhat */
Meteor.publish('userDataPoints', function() {
	/* Temp -> last hour */
	// function getLastTempDataPoint(id) {
	// 	var oneHourAgo = new moment().subtract(1, 'h').toDate(),
	// 	datapoint = DataPoints.findOne({
	// 		sensor: id,
	// 		createdAt: {
	// 			$lt: oneHourAgo
	// 		}
	// 	});
	// 	console.log('t', datapoint);
	// 	return datapoint;
	// }
	//
	// /* IR - yesterday's most recent */
	// function getLastIRDataPoint(id) {
	// 	var yesterday = new moment().subtract(24, 'h').toDate(),
	// 	datapoint = DataPoints.findOne({
	// 		sensor: id,
	// 		createdAt: {
	// 			$gte: yesterday
	// 		}
	// 	});
	// 	console.log('i', id, datapoint);
	// 	return  datapoint;
	// }

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
		sensorIds = Sensors.find({
			_id: {
				$in: hubSensors
			}
		}, {
			sort: {
				name: 1,
				createdAt: -1
			}
		}).map(function(s) {
			return s._id;
		});

	// sensors.forEach(function(s) {
	// 	console.log(s);
	// 	// var dp;
	// 	// if (s.type === 't') {
	// 	// 	dp = getLastTempDataPoint(s._id);
	// 	// } else if (s.type === 'i') {
	// 	// 	dp = getLastIRDataPoint(s._id);
	// 	// }
	// 	//
	// 	// if (dp) {
	// 		ors.push({
	// 			sensor: s._id,
	// 			sort: {
	// 				createdAt: -1
	// 			},
	// 			limit: 1
	// 			// createdAt: {
	// 			// 	$gte: dp.createdAt
	// 			// }
	// 		});
	// 	//}
	//
	// });
	//
	// if (!ors.length) {
	// 	return [];
	// }
	//
	// console.log(ors);

	return DataPoints.find({

	});
});
