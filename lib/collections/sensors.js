Sensors = new Mongo.Collection('sensors');

Schemas.sensor = new SimpleSchema(
{
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
				max: 1,
				autoform: {
						options: function () {
								'use strict';

								var options = [];
								SensorTypes.find().forEach(function (element) {
										options.push({
												label: element.name, value: element.character
										});
								});
								return options;
						}
				}
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

Sensors.attachSchema(Schemas.sensor);

Schemas.roomSensor= new SimpleSchema(
{
		sensor: {
				type: String,
				label: 'Sensor',
				min: 1,
				max: 1,
				autoform: {
						options: function () {
								'use strict';

								var options = [];
								SensorTypes.find().forEach(function (element) {
										options.push({
												label: element.name, value: element.character
										});
								});
								return options;
						}
				}
		}
})
