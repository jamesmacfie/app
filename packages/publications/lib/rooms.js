'use strict';

Meteor.publish('userRooms', function() {
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
