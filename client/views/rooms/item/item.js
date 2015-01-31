Template.roomItem.helpers({
	sensorCount: function() {
		return Sensors.find().count();
	}
})
