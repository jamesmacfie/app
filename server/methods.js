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
		updateRoom: function(room, query, id) {
			// Man, def need some sort of validation here
			return Rooms.update(id, query);
		},
		insertRoomSensor: function(sensorId, roomId) {
			var room = Rooms.findOne(roomId);

			if (!room) {
				return;
			}

			if (room.sensors === undefined) {
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
		removeRoomSensor: function(sensorId, roomId) {
			var room = Rooms.findOne(roomId);

			if (!room) {
				return;
			}

			Rooms.update(room._id, {
				$pull: {
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
		updateSensorName: function(sensor, query, id) {
			if (sensor.name) {
				console.log('updating');
				return Sensors.update(id, {
					$set: {
						name: sensor.name
					}
				});
			} else {
				console.log('removing');
				return Sensors.update(id, {
					$unset: {
						name: ''
					}
				});
			}
		},
		insertFakeSensorData: function(data) {
			DataPoints.insert({
				sensor: data.sensor,
				value: data.value,
				createdAt: new Date()
			});
		},
		insertMotionFakeSensorData: function() {
			// var nextChange = Math.ceil(Math.random() * 120),
			// 	nextValue = false,
			// 	nextMoment = new moment(),
			// 	arr = []
			//
			// for (var i = 0; i < 10; i++) {
			//
			// 	arr.push({
			// 		sensor: 'a8oawhjFz25anXyQW',
			// 		value: nextValue,
			// 		createdAt: new moment(nextMoment.toDate()).toDate()
			// 	});
			//
			// 	nextChange = nextChange += Math.ceil(Math.random() * 120);
			// 	nextValue = !nextValue;
			// 	nextMoment.subtract(nextChange, 's');
			//
			// }
			//
			// _.each(arr, function(a) {
			// 	console.log(a);
			// 	DataPoints.insert(a);
			// })

		DataPoints.insert({
				sensor: 'a8oawhjFz25anXyQW',
				value: true,
				createdAt: new moment().subtract(3, 'h').toDate()
			});

		DataPoints.insert({
			sensor: 'a8oawhjFz25anXyQW',
			value: false,
			createdAt: new moment().subtract(2, 'h').toDate()
		});
	}
});
