'use strict';

Template.roomEditModal.events({
	'click .js-saveRoom': function(event, view) {
		var id = view.find('input[name="_id"]').value,
			name = view.find('input[name="name"]').value,
			showOnHomepage = view.find('input[name="homepage.show"]').checked;

		Rooms.update({
			_id: id
		}, {
			$set: {
				name: name,
				'homepage.show': showOnHomepage
			}
		});

		jQuery('#editRoom').modal('hide');
	}
});
