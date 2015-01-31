DataPoints = new Mongo.Collection('dataPoints');

Schemas.dataPoint = new SimpleSchema(
{
	sensor: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	value: {
		type: String
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

DataPoints.attachSchema(Schemas.dataPoint);
