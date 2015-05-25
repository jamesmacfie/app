DataPoints = new Mongo.Collection('dataPoints');

// This is only here for testing. Shouldn't need an enforced schema from this app.
var dataPoint = new SimpleSchema({
	sensor: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	type: {
		type: String
	},
	value: {
		type: String
	},
	createdAt: {
		type: Date,
		autoValue: function(record) {
			'use strict';
			if (this.isInsert) {
				if (!record.createdAt) {
					return new Date();
				}
			} else {
				this.unset();
			}
		}
	}
});

DataPoints.attachSchema(dataPoint);
