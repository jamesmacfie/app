DataPoints = new Mongo.Collection('dataPoints');

Schemas.dataPoint = new SimpleSchema(
{
	sensor: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		autoform: {
			options: function () {
				'use strict';

				var sensors = Sensors.find(),
					options = [];

					sensors.forEach(function (element) {
					options.push({
						label: element.name, value: element._id
					});
				});

				return options;
			}
		}
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
