'use strict';

Meteor.methods({
	updateAccount: function(params) {
		if (!this.userId) {
			return new Meteor.Error(401, 'You need to be logged in.');
		}

		var user = Meteor.users.findOne(this.userId),
			emailObj = user.emails[0];

		// Do email validation, BTW
		emailObj.address = params.email;

		Meteor.users.update(user._id, {
			$set: {
				'profile.name': params.name,
				'profile.image': params.image,
				emails: [emailObj]
			}
		});

		if (params.password) {
			Accounts.setPassword(this.userId, params.password);
		}

	}
});
