'use strict';

Meteor.methods({
	insertNetwork: function(name) {
		Networks.insert({
			name: name,
			users: [this.userId]
		});
	}
});
