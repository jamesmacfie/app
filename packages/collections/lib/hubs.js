Hubs = new Mongo.Collection('hubs');

var hub = new SimpleSchema({
	hubId: {
		type: Number,
		label: 'Hub Id'
	},
	name: {
		type: String,
		label: 'Name',
		optional: true
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

Hubs.attachSchema(hub);
