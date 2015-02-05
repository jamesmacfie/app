'use strict';

Template.home.helpers({
		belongsToNetworks: function() {
				return !!Networks.find().count();
		},
		rooms: function() {
				return Rooms.find({
						'homepage.show': true
				});
		}
});
