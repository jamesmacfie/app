'use strict';

Meteor.reactivePublish('userHubSensors', function() {
	var networkHubs = _.flatten(Networks.find({
				users: {
					$in: [this.userId]
				}
			}, {
				reactive: true
			}).map(function mapNetworkHubsId(n) {
				return n._hubs;
			})
		),
		hubSensors = _.flatten(Hubs.find({
				network: {
					$in: networkHubs
				}
			}, {
				reactive: true
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
