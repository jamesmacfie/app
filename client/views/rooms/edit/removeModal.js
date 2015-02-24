'use strict';

Template.roomRemoveModal.events({
	'click .js-removeRoom': function(event, view) {
		var id = view.find('input[name="_id"]').value;

		Rooms.remove({
			_id: id
		});

		Router.go('roomList');

		FlashMessages.sendSuccess('Room removed.');
	}
});
