function getSensor(id) {
	return Sensors.findOne(id.toString()); /* WTF is going on here with this ID? */
}

function getSensorInfo(sensorType, infoType) {
	var sensorInfo = {
		t: {
			icon: 'home',
			class: 'temp'
		},
		i: {
			icon: 'layers',
			class: 'ir'
		}
	};

	return sensorInfo[sensorType][infoType];

}

Template.sensorIcon.helpers({
	icon: function() {
		var s = getSensor(this);
		return getSensorInfo(s.type, 'icon');
	},
	class: function() {
		var s = getSensor(this);
		return getSensorInfo(s.type, 'class');
	}
});
