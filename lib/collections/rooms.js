Rooms = new Mongo.Collection('rooms');

Schemas.room = new SimpleSchema(
{
		name: {
				type: String,
				label: 'Name',
				max: 200
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
		hub: {
				type: String,
				regEx: SimpleSchema.RegEx.Id,
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

Rooms.attachSchema(Schemas.room);
