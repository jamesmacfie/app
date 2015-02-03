'use strict';

Meteor.publish('room', function(id) {
		return Rooms.find({
				_id: id
		});
});

Meteor.publish('userRooms', function() {
		var networks = Networks.find({
				users: {
						$in: [this.userId]
				}
		}).map(function(n) {
				return n._id;
		});

		return Rooms.find({
				hub: {
						$in: networks
				}
		}, {
			sort: {
				name: 1
			}
		});
});
