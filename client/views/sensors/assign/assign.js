'use strict';

Template.sensorAssign.helpers({
	sensorDisplayName: function() {
		function getTypeDisplay(sensor) {
			if (sensor.type === 't') {
				return '(Temperature)';
			} else if (sensor.type === 'i') {
				return '(Motion)';
			}

			return '(?)';
		}
		if (this.name) {
			return name;
		} else {
			return this.moduleId + ' - ' + getTypeDisplay(this);
		}
	}
});

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
