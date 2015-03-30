'use strict';

Template.roomRemove.helpers({

});

Template.roomRemove.events({
	'click .js-cancelRemove': function(event, view) {
		$(view.find('.modal')).closeModal();
	},
	'click .js-confirmRemove': function(event, view) {
		var _id = view.data._id;
		Meteor.call('removeRoom', _id, function(error) {
			$(view.find('.modal')).closeModal();
			if (error) {
				console.log('Shit, error inserting room');
				return;
			}

			Router.go('roomList');
		});
	}
});
