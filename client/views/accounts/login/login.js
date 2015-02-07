'use strict';

Template.login.events({
	'submit #login-form' : function(event, template) {
		function trimInput(val) {
			return val.replace(/^\s*|\s*$/g, '');
		}

		event.preventDefault();

		// retrieve the input field values
		var email = trimInput(template.find('#login-email').value),
			password = trimInput(template.find('#login-password').value);

		// Trim and validate your fields here....

		// If validation passes, supply the appropriate fields to the
		// Meteor.loginWithPassword() function.
		Meteor.loginWithPassword(email, password, function(err){
			if (err) {
				debugger;
			} else {
				Router.go('home');
			}
			return false;
		});
	}
});
