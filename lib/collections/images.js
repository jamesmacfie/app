Images = new Mongo.Collection('images');

Schemas.images = new SimpleSchema(
{
	url: {
		type: String,
	},
	textColor: {
		type: String,
		autoValue: function(record) {
			'use strict';
			console.log('textColour', record);
			if (record.default === undefined) {
				return;
			}
		}
	},
	default: {
		type: Boolean,
		autoValue: function(record) {
			'use strict';
			console.log('default', record);
			if (record.default === undefined) {
				return false;
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
