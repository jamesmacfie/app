Rooms = new Mongo.Collection('rooms');

var room = new SimpleSchema({
	name: {
		type: String,
		label: 'Name',
		max: 200
	},
	description: {
		type: String,
		label: 'Description',
		max: 1000,
		optional: true
	},
	homepage: {
		type: Object
	},
	'homepage.show': {
		type: Boolean,
		label: 'Show on homepage'
	},
	'homepage.order': {
		type: Number,
		label: 'Order on homepage',
		optional: true
	},
	image: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
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
	network: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
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

Rooms.attachSchema(room);
