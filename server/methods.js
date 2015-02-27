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
					hub;

				delete hub.network;

				hub = Hubs.findOne({
					hubId: hub.hubId
				});

				if (!hub) {
					console.log('No hubId');
					return false;
				}

				Networks.update(network._id, {
					$push: {
						hubs: hub._id
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
		insertDataPoint: function(params) {
			console.log('insertDataPoint');
			console.log(arguments);
			try {
				var sensor = Sensors.findOne({
						moduleId: parseInt(params.moduleId)
					}),
					moduleId = params.moduleId,
					value = params.value;

				if (!sensor) {
					console.log('No sensor with the mooduleId `' + moduleId + '` found');
					return;
				}

				if (value === undefined) {
					console.log('A dataPoint value needs to be passed through');
					return;
				}

				DataPoints.insert({
					sensor: sensor._id,
					value: value
				});

			} catch(e) {
				console.log('Something went terribly wrong' + e.message);
			}
		}
});
