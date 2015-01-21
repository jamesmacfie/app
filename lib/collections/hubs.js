Hubs = new Mongo.Collection('hubs');

Schemas.hub = new SimpleSchema(
{
	hubId: {
		type: Number,
		label: 'Hub Id'
	},
	name: {
		type: String,
		label: 'Name'
	},
	/* Here for autoform. Might be a better way because hubs don't belong in a sensor. I guess
		 we won't be adding a hub to a network via this mechanism anyway */
	network: {
		type: String,
		label: 'Network',
		regEx: SimpleSchema.RegEx.Id,
		optional: true,
		autoform: {
			options: function () {
				'use strict';

				var options = [];
				Networks.find().forEach(function (element) {
					options.push({
						label: element.name, value: element._id
					});
				});
			return options;
			}
		}
	},
	sensors: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		autoValue: function() {
			'use strict';
			if (this.isInsert) {
				return [];
			} else {
				this.unset();
			}
		}
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			'use strict';

			return new Date();
		}
	}
});

Hubs.attachSchema(Schemas.hub);
