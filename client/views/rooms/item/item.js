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
		var $modal = jQuery('#editRoom'),
			room = view.data.room,
			id = room._id,
			name = room.name || '',
			showOnHomePage = room.homepage.show;

		$modal.find('input[name="_id"]').val(id);
		$modal.find('input[name="name"]').val(name);
		$modal.find('input[name="homepage.show"]').attr('checked', showOnHomePage);
		$modal.modal('show');
	}
});
