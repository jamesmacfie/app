'use strict';

Template.profileEdit.helpers({
	emailAddress: function() {
		return this.emails[0].address;
	}
});

Template.profileEdit.events({
	'click .js-updateProfile': function(event, view) {
		var name = $(view.find('[name="name"]')).val().trim(),
			email = $(view.find('[name="email"]')).val().trim(),
			currentpassword = $(view.find('[name="password"]')).val().trim(),
			newpassword = $(view.find('[name="newpassword"]')).val().trim(),
			newpassword2 = $(view.find('[name="newpassword2"]')).val().trim(),
			image = $(view.find('.js-selectImage.is-selected')).attr('data-id'),
			obj = {
				name: name,
				image: image,
				email: email
			};

		// Validation
		if (!name.length) {
			FlashMessages.sendError('You need to enter a name.', {
				autoHide: false
			});
			return;
		}

		if (!email.length) {
			FlashMessages.sendError('You need to enter an email address.', {
				autoHide: false
			});
			return;
		} else {
			// Need to do some sort of email validation here
		}

		if (currentpassword.length) {
			// The user has entered a password - let's see if they can change it to a new one

			if (newpassword !== newpassword2) {
				FlashMessages.sendError('Your new passwords do not match', { // Shitty error message?
					autoHide: false
				});
				return;
			}

			obj.password = newpassword;
		}

		debugger;
		// Actually update the profile - how do?
		Meteor.call('updateAccount', obj, function(err, result) {
			FlashMessages.clear();
			if (err) {
				FlashMessages.sendError('An unknown server error occurred', {
					autoHide: false
				});
				return;
			}

			if (_.isObject(result) && result.error) {
				FlashMessages.sendError(result.reason, {
					autoHide: false
				});
				return;
			}

			history.back();
		});
	}
});
