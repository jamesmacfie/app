'use strict';

Template.roomList.helpers({
	hasRooms: function() {
			return !!Rooms.find().count();
	}
});

Template.roomList.events({
	'click .js-addRoom': function() {
		Session.set('prev', 'roomList');
		Router.go('roomInsert');
	}
});
