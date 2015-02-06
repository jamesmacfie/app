'use strict';

Meteor.publish('userHubSensors', function() {
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
		);

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

Meteor.publish('sensorTypes', function() {
		return SensorTypes.find();
});
