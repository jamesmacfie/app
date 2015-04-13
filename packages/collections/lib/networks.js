Networks = new Mongo.Collection('networks');

var network = new SimpleSchema({
	name: {
		type: String,
		label: 'Name'
	},
	hubs: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: true,
		autoValue: function() {
			'use strict';
			if (this.isInsert) {
				return [];
			} else {
				this.unset();
			}
		}
	},
	users: {
		type: [String],
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

Networks.attachSchema(network);
