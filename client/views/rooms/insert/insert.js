'use strict';

Template.roomInsert.helpers({
	hasMoreThanOneNetwork: function() {
		return Networks.find().count() > 1;
	},
	singleNetworkId: function() {
		return Networks.findOne()._id;
	},
	networks: function() {
		return Networks.find();
	}
});

Template.roomInsert.events({
	'click .js-selectImage': function(event, view) {
		var currentlySelected = view.find('.is-selected');

		if (currentlySelected) {
			jQuery(currentlySelected).removeClass('is-selected');

			if (currentlySelected === event.target) {
				// Deselecting the current image
				return;
			}
		}

		jQuery(event.currentTarget).addClass('is-selected');
	},
	'click .js-insertRoom': function(event, view) {
		//Need to enter validation
		var name = $(view.find('[name="name"]')).val(),
			description = $(view.find('[name="description"]')).val(),
			network = $(view.find('[name="network"]')).val(),
			homepageShow = $(view.find('[name="showOnHomepage"]')).is(':checked'),
			image = $(view.find('.js-selectImage.is-selected')),
			imageId,
			obj;

		if (image) {
			imageId = image.attr('data-id');
		}

		obj = {
			name: name,
			description: description,
			image: imageId,
			network: network,
			homepage: {
				show: homepageShow
			}
		};

		Meteor.call('insertRoom', obj, function(error, roomId) {
			if (error) {
				console.log('Shit, error inserting room');
				return;
			}
			Router.go('room', {_id: roomId});
		});
	}

});
