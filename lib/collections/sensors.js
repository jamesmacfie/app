Sensors = new Mongo.Collection('sensors');

Schemas.sensor = new SimpleSchema(
{
		moduleId: {
				type: Number,
				label: 'Module Id'
		},
		/* Here for autoform. Might be a better way because hubs don't belong in a sensor. I guess
			 we won't be adding a sensor to a hub via this mechanism anyway */
		hub: {
				type: String,
				label: 'Hub',
				optional: true,
				autoform: {
						options: function () {
							'use strict';

							var hubIds = _.flatten(Networks.find({
									users: {
										$in: [Meteor.userId()]
									}
								}).map(function(n) {
									return n.hubs;
								})),
								hubs = Hubs.find({
									_id: {
										$in: hubIds
									}
								}),
								options = [];

							hubs.forEach(function (element) {
								options.push({
									label: element.name, value: element._id
								});
							});

							return options;
						}
				}
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
