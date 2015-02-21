'use strict';

Template.roomEditModal.events({
	'click .js-saveRoom': function(event, view) {
		var id = view.find('input[name="_id"]').value,
			name = view.find('input[name="name"]').value,
			showOnHomepage = view.find('input[name="homepage.show"]').checked,
			image = view.find('.js-imageSelected'),
			imageId,
			set = {
				name: name,
				'homepage.show': showOnHomepage
			},
			unset = {};

		if (image) {
			imageId = image.attributes['data-id'].value;

			set.image = imageId;
		} else {
			unset.image = null;
		}

		Rooms.update({
			_id: id
		}, {
			$set: set,
			$unset: unset
		});

		jQuery('#editRoom').modal('hide');
	},
	'click .js-selectImage': function(event, view) {
		var currentlySelected = view.find('.js-imageSelected');

		if (currentlySelected) {
			jQuery(currentlySelected).removeClass('thumb-selected js-imageSelected');

			if (currentlySelected === event.target) {
				// Deselecting the current image
				return;
			}
		}

		jQuery(event.target).addClass('thumb-selected js-imageSelected');
	}
});
