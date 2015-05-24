SensorTypes = new Mongo.Collection('sensorTypes');

var sensorType = new SimpleSchema({
	name: {
		type: String,
		max: 200
	},
	code: {
		type: String
	}
});

SensorTypes.attachSchema(sensorType);
