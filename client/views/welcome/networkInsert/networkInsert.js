'use strict';

Template.welcomeNetworkInsert.events({
	'click .js-confirmInsert': function(event, view) {
		FlashMessages.clear();

		var name = $(view.find('[name="name"]')).val();

		if (!name || !name.length)  {
			FlashMessages.sendError('Please enter the new network\'s name', {
				autoHide: false
			});
			return;
		}

		Meteor.call('insertNetwork', name, function(err, result) {
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
			
			Router.go('welcomeHubInsert');
		});
	}
});
