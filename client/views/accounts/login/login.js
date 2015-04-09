'use strict';

Template.login.events({
	'click .js-login' : function(event, template) {
		function trimInput(val) {
			return val.replace(/^\s*|\s*$/g, '');
		}

		// retrieve the input field values
		var email = trimInput(template.find('[name="email"]').value),
			password = trimInput(template.find('[name="password"]').value);

		if (!email.length && !password.length) {
			FlashMessages.sendError('Please enter your email address and password.');
			return;
		} else if (!email.length) {
			FlashMessages.sendError('Please enter your email address.');
			return;
		} else if (!password.length) {
			FlashMessages.sendError('Please enter your password.');
			return;
		}

		Meteor.loginWithPassword(email, password, function(err){
			if (err) {
				if (err.reason === 'User not found') {
					FlashMessages.sendError('No user with that email address exists.');
				} else if (err.reason === 'Incorrect password') {
					FlashMessages.sendError('The entered password is incorrect.');
				}
			} else {
				Router.go('home');
			}
			return false;
		});
	}
});
