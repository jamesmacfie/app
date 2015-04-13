'use strict';

Meteor.methods({
	insertRoom: function(room) {
		var roomData = _.extend(room, {
			users: [this.userId]
		}),
		id;

		id = Rooms.insert(roomData);
		return id;
	},
	updateRoom: function(room, query, id) {
		// Man, def need some sort of validation here
		return Rooms.update(id, query);
	},
	removeRoom: function(id) {
		Rooms.remove({
			_id: id
		});
	},
	insertRoomSensor: function(roomId, sensorId) {
		var room = Rooms.findOne(roomId),
		sensor = Sensors.findOne(sensorId);

		if (!room) {
			throw new Error('No room with the ID ' + roomId + 'exists');
		}

		if (!sensor) {
			throw new Error('No sensor with the ID ' + sensorId + 'exists');
		}

		if (room.sensors.indexOf(sensorId) !== -1) {
			return new Meteor.Error(400, 'That sensor already exists in this room.');
		}

		Rooms.update(room._id, {
			$push: {
				sensors: sensor._id
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
	}
});
