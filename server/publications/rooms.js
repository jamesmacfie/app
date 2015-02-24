'use strict';

Meteor.publish('userRooms', function() {
		/*
		 * A room should probably belong to a network, not a hub. What's going on with
		 * the query below?
		 */

		var networks = Networks.find({
				users: {
						$in: [this.userId]
				}
		}).map(function(n) {
				return n._id;
		});

		return Rooms.find({
				network: {
						$in: networks
				}
		}, {
			sort: {
				name: 1
			}
		});
});
