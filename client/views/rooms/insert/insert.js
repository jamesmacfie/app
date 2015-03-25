'use strict';

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
	}
});
