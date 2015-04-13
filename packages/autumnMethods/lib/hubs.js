'use strict';

Meteor.methods({
	insertHub: function(hubDetails) {
		if (!hubDetails.name || !hubDetails.name.length) {
			return new Meteor.Error(400, 'Please give your new hub a memorable name.');
		}

console.log('ID', hubDetails.hubId );
		var hub = Hubs.findOne({
			hubId: parseInt(hubDetails.hubId)
		}),
		hubNetwork;

		if (!hub) {
			return new Meteor.Error(400, 'We can\'t find a hub with that ID. Please check the hub Id and try again.');
		}

		hubNetwork = Networks.findOne({
			hubs: {
				$in: [hub._id]
			}
		});

		if (hubNetwork) {
			return new Meteor.Error(400, 'That hub has already been added to another network. Please check the hub Id and try again.');
		}

		Hubs.update(hub._id, {
			$set: {
				name: hubDetails.name
			}
		});

		Networks.update(hubDetails.networkId, {
			$push: {
				hubs: hub._id
			}
		});
	}
});
