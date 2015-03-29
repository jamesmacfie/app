Images = new Mongo.Collection('images');

Schemas.images = new SimpleSchema(
{
	url: {
		type: String,
	},
	thumbUrl: {
		type: String,
	},
	default: {
		type: Boolean
	},
	users: {
		type: [String],
		regEx: SimpleSchema.RegEx.Id,
		optional: true
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

Images.attachSchema(Schemas.images);
