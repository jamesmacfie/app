'use strict';

Template.sensorSummary.helpers({
	getTemplate: function() {
		switch(this.type) {
			case 't':
				return 'tempSensorSummary';
			case 'i':
				return 'irSensorSummary';
		}
	}
});

Template.sensorSummary.events({
	'click .js-editSensor': function(event, view) {
		var $modal = jQuery('#editSensor'),
			id = view.data._id,
			name = view.data.name || '';

		$modal.find('input[name="name"]').val(name);
		$modal.find('input[name="_id"]').val(id);
		$modal.modal('show');
	},
	'click .js-removeSensor': function(event, view) {
		function generateRemoveMessage(sensor) {
			var typeName;

			if (sensor.type === 't') {
				typeName = 'temperature sensor';
			} else if (sensor.type === 'i') {
				typeName = 'motion sensor';
			} else {
				typeName = 'sensor';
			}

			return ['Are you sure you want to remove',
				sensor.name ? 'the sensor \'' + sensor.name + '\'' : 'this ' + typeName,
				'from this room?'
			].join(' ');
		}

		var $modal = jQuery('#removeSensor'),
			sensor = view.data,
			room = Template.parentData().room;

		$modal.find('.js-removeMessage').text(generateRemoveMessage(sensor));
		$modal.find('input[name="_id"]').val(sensor._id);
		$modal.find('input[name="room_id"]').val(room._id);
		$modal.modal('show');
	}
});

Template.sensorSummaryEditModals.events({
	'click .js-saveSensor': function(event, view) {
		var id = view.find('#editSensor input[name="_id"]').value,
			name = view.find('#editSensor input[name="name"]').value;
debugger;
		Sensors.update({
			_id: id
		}, {
			$set: {
				name: name
			}
		});

		jQuery('#editSensor').modal('hide');
	},
	'click .js-removeSensor': function(event, view) {
		var id = view.find('#removeSensor input[name="_id"]').value,
			roomId = view.find('#removeSensor input[name="room_id"]').value;

		Meteor.call('removeRoomSensor', id, roomId, function() {
			$('.modal').hide();
		});
	}
});
