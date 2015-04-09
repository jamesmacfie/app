'use strict';

Template.signUp.events({
	'click .js-cancelSignup': function() {
		Router.go('login');
	},
	'click .js-confirmSignup' : function(event, template) {
		function trimInput(val) {
			return val.replace(/^\s*|\s*$/g, '');
		}

		// retrieve the input field values
		var email = trimInput(template.find('[name="email"]').value),
			password = trimInput(template.find('[name="password"]').value);

		if (!email.length && !password.length) {
			FlashMessages.sendError('Please enter an email address and password.');
			return;
		} else if (!email.length) {
			FlashMessages.sendError('Please enter an email address.');
			return;
		} else if (!password.length) {
			FlashMessages.sendError('Please enter a password.');
			return;
		}

		Accounts.createUser({email: email, password : password}, function(err){
			if (err) {
				// Inform the user that account creation failed
				if (err.reason === 'Email already exists.') {
					FlashMessages.sendError(['That user already has an account. <a href="', Router.path('login'), '?emailAddress=', email, '">Login here</a>.'].join(''));
				}
			} else {
				Router.go('welcomeNetworkInsert');
			}

		});

		return false;
	}
});
