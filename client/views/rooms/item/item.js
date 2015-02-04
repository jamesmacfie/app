'use strict';

Template.roomItem.helpers({
	sensorCount: function() {
		return Sensors.find().count();
	}
});


Template.roomItem.events({
	'click .js-removeSensor': function(event, view) {
		var sensor = this,
			room = view.data.room;

		Meteor.call('removeRoomSensor', sensor._id, room._id, function() {
			$('.modal').hide();
		});
	}
});
