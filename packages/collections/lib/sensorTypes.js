SensorTypes = new Mongo.Collection('sensorTypes');

var sensorType = new SimpleSchema({
	name: {
		type: String,
		label: 'Name',
		max: 200
	},
	character: {
		type: String,
		label: 'Character',
		max: 1
	}
});

SensorTypes.attachSchema(sensorType);
