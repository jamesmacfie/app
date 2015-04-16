'use strict';

Template.profileEdit.events({
	'click .jsUpateProfile': function(event, view) {
		var name = $(view.find('[name="name"]')).val().trim(),
			email = $(view.find('[name="emmail"]')).val().trim(),
			currentpassword = $(view.find('[name="password"]')).val().trim(),
			newpassword = $(view.find('[name="newpassword"]')).val().trim(),
			newpassword2 = $(view.find('[name="newpassword2"]')).val().trim();

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
			}
		}

		// Actually update the profile - how do?

	}
});
