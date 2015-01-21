'use strict';

Meteor.methods({
		insertNetwork: function(network) {
				var networkData = _.extend(network, {
						users: [this.userId]
				});

				Networks.insert(networkData);
		},
		insertHub: function(hub) {
				var network = Networks.findOne(hub.network),
					hubId;

				delete hub.network;

				hubId = Hubs.insert(hub);

				Networks.update(network._id, {
					$push: {
						hubs: hubId
					}
				});

		},
		insertRoom: function(room) {
				var roomData = _.extend(room, {
						users: [this.userId]
				});

				Rooms.insert(roomData);
		},
		insertRoomSensor: function(sensorId, roomId) {
			var room = Rooms.findOne(roomId);

			if (!room) {
				return;
			}

			if (room.sensors === undefined) {
				console.log('adding empty array');
				Rooms.update(room._id, {
					$set: {
						sensors: []
					}
				});
			}

			Rooms.update(room._id, {
				$push: {
					sensors: sensorId
				}
			});
		},
		insertSensor: function(sensor) {
			// Does this module already exist
			var existingSensor = Sensors.findOne({
					moduleId: sensor.moduleId
				}),
				hub = Hubs.findOne(sensor.hub),
				sensorId;

			if (existingSensor) {
				return false;
			}

			delete sensor.hub;

			sensorId = Sensors.insert(sensor);

			Hubs.update(hub._id, {
				$push: {
					sensors: sensorId
				}
			});
		},
		insertDataPoint: function(data) {
				DataPoint.insert({
						value: data.value,
						timeStamp: new Date()
				});
		}
});
