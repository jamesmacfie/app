'use strict';


(function() {
	function trimInput(val) {
		return val.replace(/^\s*|\s*$/g, '');
	}

	function login(email, password) {
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


	Template.login.events({
		'keyup .js-loginEnter': function(event, template) {
			if (event.keyCode !== 13) {
				return;
			}
			var email = trimInput(template.find('[name="email"]').value),
				password = trimInput(template.find('[name="password"]').value);

			login(email, password);
		} ,
		'click .js-login' : function(event, template) {
			var email = trimInput(template.find('[name="email"]').value),
				password = trimInput(template.find('[name="password"]').value);

			login(email, password);
		}
	});

})()
