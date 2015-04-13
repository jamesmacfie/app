Sensors = new Mongo.Collection('sensors');

var sensor = new SimpleSchema({
	moduleId: {
		type: Number,
		label: 'Module Id'
	},
	name: {
		type: String,
		label: 'Nickname',
		optional: true
	},
	type: {
		type: String,
		label: 'Sensor type',
		min: 1,
		max: 1
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			'use strict';
			if (this.isInsert) {
				return new Date();
			} else {
				this.unset();
			}
		}
	}
});

Sensors.attachSchema(sensor);
