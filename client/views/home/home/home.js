'use strict';

Template.home.helpers({
	belongsToNetworks: function() {
		return !!Networks.find().count();
	},
	hasRooms: function() {
		return Rooms.find({
			'homepage.show': true
		}).count();
	}
});
