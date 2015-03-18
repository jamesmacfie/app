'use strict';

Template.home.helpers({
	tabs: function() {
		return [
			{
				name: 'Rooms',
				slug: 'rooms',
				onRender: function() {
					console.log('render rooms');
				}
			},
			{
				name: 'Sensors',
				slug: 'sensors',
				onRender: function() {
					console.log(this);
					console.log('render sensors');
				}
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
