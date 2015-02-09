'use strict';

Template.sensorAssign.events({
	'submit #roomInsertSensorForm': function(event) {
		event.preventDefault();

		var sensorId = $('.js-formSensor').val(),
			roomId = $('.js-formRoom').val();

		if (!sensorId) {
			return;
		}

		Meteor.call('insertRoomSensor', sensorId, roomId, function() {
			Router.go('room', {
				_id: roomId
			});
		});
	}
});
