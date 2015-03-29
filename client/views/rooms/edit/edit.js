'use strict';

Template.roomEdit.events({
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
	'click .js-updateRoom': function(event, view) {
		var _id = view.data.room._id,
			name = $(view.find('[name="name"]')).val().trim(),
			description = $(view.find('[name="description"]')).val().trim(),
			homepageShow = $(view.find('[name="showOnHomepage"]')).is(':checked'),
			image = $(view.find('.js-selectImage.is-selected')),
			imageId,
			obj;

		// Validation
		if (!name.length) {
			FlashMessages.sendError('You need to enter a name for this room.', {
				autoHide: false
			});
			return;
		}

		if (image) {
			imageId = image.attr('data-id');
		}

		obj = {
			name: name,
			description: description,
			image: imageId,
			homepage: {
				show: homepageShow
			}
		};

		Rooms.update({
			_id: _id,
		}, {
			$set: obj
		});

		Router.go('room', {
			_id: _id
		});
	}

});
