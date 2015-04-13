'use strict';

Meteor.publish('hub', function(id) {
	var hubIds = _.flatten(Networks.find({
			users: {
				$in: [this.userId]
			}
		}).map(function(n) {
			return n.hubs;
		})
	);

	if (hubIds.indexOf(id) === -1) {
		return [];
	}

	return Hubs.find({
		_id: id
	});
});

Meteor.reactivePublish('userHubs', function() {
	var hubIds = _.flatten(Networks.find({
			users: {
				$in: [this.userId]
			}
		}, {
			reactive: true
		}).map(function(n) {
			return n.hubs;
		})
	);

	return Hubs.find({
		_id: {
			$in: hubIds
		}
	});
});
