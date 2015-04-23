Sensors = new Mongo.Collection('sensors');

var sensor = new SimpleSchema({
	moduleId: {
		type: Number,
	},
	name: {
		type: String,
		optional: true
	},
	type: {
		type: String,
		min: 1,
		max: 1
	},
	lastConnectionAt: {
		type: Date,
		optional: true
	},
	lastConnectionBy: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
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
