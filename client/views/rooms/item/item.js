'use strict';

Template.room.helpers({
	backgroundImageStyle: function() {
		if (this.room.image) {
			var image = Images.findOne(this.room.image);
			return 'background-image: url(\'/images/roomBackgrounds/' + image.url + '\');';
		}
	},
	sensorCount: function() {
		return this.sensors.count();
	}
});

Template.room.events({
	'click .js-editRoom': function(event, view) {
		Router.go('roomEdit', {
			_id: view.data.room._id
		});
	},
	'click .js-removeRoom': function(event, view) {
		console.log('remove room - show modal or something');
	}
});
