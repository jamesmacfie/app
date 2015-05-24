'use strict';

Meteor.publish('latestDataPoint', function(sensorId) {
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

	if (sensorIds.indexOf(sensorId) === -1) {
		return;
	}

	return DataPoints.find({
		sensor: sensorId
	},
	{
		sort: {
			createdAt: -1
		},
		limit: 1
	});
});

Meteor.publish('activityDataPoints', function() {
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

	return DataPoints.find(
	{
		sensor: {
			$in: sensorIds
		}
	}, {
		limit: 50,
		sort: {
			createdAt: -1
		}
	});
});

/* This needs to be fixed. Currently doesn't even do what it's meant to */
Meteor.publish('userDataPoints', function() {
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
	// 	// if (s.type === 'temperature') {
	// 	// 	dp = getLastTempDataPoint(s._id);
	// 	// } else if (s.type === 'motion') {
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

	return DataPoints.find();
});
