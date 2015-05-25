'use strict';

Template.roomSensorRemove.helpers({
	sensorDescription: function() {
		if (this.name) {
			return 'the sensor \'' + this.name + '\'';
		}

		var sensorNames = SensorTypes.find({
			code: {
				$in: this.type
			}
		}).fetch().map(function(s) {
			return s.name;
		});
		return 'this ' + sensorNames.join('/') + ' sensor';
	},
	roomName: function() {
		// Not the best way here of getting the current room...
		var currentRouteData = Router.current().data(),
			roomId = currentRouteData.room._id,
			room = Rooms.findOne(roomId);

		return room.name;
	}
});

Template.roomSensorRemove.events({
	'click .js-cancelRemove': function(event, view) {
		$(view.find('.modal')).closeModal();
	},
	'click .js-confirmRemove': function(event, view) {
		// Not the best way here of getting the current room...
		var id = $(view.find('.modal')).data('id'),
			currentRouteData = Router.current().data(),
			roomId = currentRouteData.room._id;

		Rooms.update({
			_id: roomId
		}, {
			$pull: {
				sensors: id
			}
		});
		$(view.find('.modal')).closeModal();
	}
});
