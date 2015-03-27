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
		debugger;
		//Need to enter validation
		var name = $(view.find('[name="name"]')).val(),
			description = $(view.find('[name="description"]')).val(),
			network = $(view.find('[name="network"]')).val(),
			homepageShow = true, //Temp
			image = $(view.find('.js-imageSelected')),
			imageId,
			obj;

		if (image) {
			imageId = '9bdZjzWNzyYDxp2To';
			//imageId = image.attributes['data-id'].value;
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

		Meteor.call('insertRoom', obj, function(id) {
			debugger;
		});
		//		Router.go('rooms/' + roomId);
	}

});
