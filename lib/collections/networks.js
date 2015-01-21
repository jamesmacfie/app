Networks = new Mongo.Collection('networks');

Schemas.network = new SimpleSchema(
{
    name: {
        type: String,
        label: 'Name'
    },
    hubs: {
        type: [String],
        regEx: SimpleSchema.RegEx.Id,
        optional: true
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

Networks.attachSchema(Schemas.network);
