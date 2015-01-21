'use strict';

Meteor.publish('hub', function(id) {
		return Hubs.find({
				_id: id
		});
});

Meteor.publish('userHubs', function() {
		var hubIds = _.flatten(Networks.find({
				users: {
						$in: [this.userId]
				}
		}).map(function(n) {
				return n.hubs;
		}));

		return Hubs.find({
				_id: {
						$in: hubIds
				}
		});
});
