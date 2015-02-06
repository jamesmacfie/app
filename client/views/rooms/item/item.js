'use strict';

Template.roomItem.helpers({
	sensorCount: function() {
		return this.sensors.count();
	}
});


Template.roomItem.events({
	'click .js-removeSensor': function(event, view) {
		var sensor = this,
			room = view.data.room;

		Meteor.call('removeRoomSensor', sensor._id, room._id, function() {
			$('.modal').hide();
		});
	},
	'click .js-saveSensor': function(event, view) {
		var sensor = this,
			name = view.find('input[name="name"]').value;

		Sensors.update({
			_id: sensor._id
		}, {
			$set: {
				name: name
			}
		});

		$('.modal').hide();
	}
});
