'use strict';

Template.home.onCreated(function () {
	this.subscribe('userRooms');
	this.subscribe('userHubSensors');
});

Template.home.helpers({
	tabs: function() {
		return [
			{
				name: 'Rooms',
				slug: 'rooms'
			},
			{
				name: 'Sensors',
				slug: 'sensors'
			}
		];
	},
	belongsToNetworks: function() {
		return !!Networks.find().count();
	},
	hasRooms: function() {
		return Rooms.find({
			'homepage.show': true
		}).count();
	}
});
