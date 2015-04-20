'use strict';

Template.hubRemove.events({
	'click .js-cancelRemove': function(event, view) {
		$(view.find('.modal')).closeModal();
	},
	'click .js-confirmRemove': function(event, view) {
		var _id = view.data._id;
		Meteor.call('removeHub', _id, function(error) {
			$(view.find('.modal')).closeModal();
			if (error) {
				console.log('Shit, error removing hub');
				return;
			}

			history.back();
		});
	}
});
