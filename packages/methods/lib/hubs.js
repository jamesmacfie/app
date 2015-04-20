'use strict';

Meteor.methods({
	insertHub: function(hubDetails) {
		if (!hubDetails.name || !hubDetails.name.length) {
			return new Meteor.Error(400, 'Please give your new hub a memorable name.');
		}

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
	},
	removeHub: function(id) {
		var network = Networks.findOne({
			hubs: {
				$in: [id]
			}
		});

		if (!network) {
			return new Meteor.Error(400, 'That hub doesn\'t belong to any network so can\'t be removed');
		}

		Networks.update(network._id, {
			$pull: {
				hubs: id
			}
		});
	},
});
