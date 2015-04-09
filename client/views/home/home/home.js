'use strict';

Template.home.onCreated(function () {
	this.subscribe('userRooms');
	this.subscribe('userHubSensors');
});

Template.home.helpers({
	tabs: function() {
		return [
			{
				name: 'Sensors',
				slug: 'sensors'
			},
			{
				name: 'Rooms',
				slug: 'rooms'
			}
		];
	},
	belongsToNetworks: function() {
		return !!Networks.find().count();
	},
	hasRooms: function() {
		// What am I doing with the 'show on homepage' flag?
		return Rooms.find().count();
	},
	hasSensors: function() {
		// Do we have a'show on homepage' flag?
		return Sensors.find().count();
	}
});
