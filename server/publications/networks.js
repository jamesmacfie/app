'use strict';

Meteor.publish('userNetworks', function() {
		return Networks.find({
				users: {
						$in: [this.userId]
				}
		});
});
