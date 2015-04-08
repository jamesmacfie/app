'use strict';

Template.networkEdit.events({
	'click .js-updateNetwork': function(event, view) {
		var _id = view.data._id,
			name = $(view.find('[name="name"]')).val().trim();

		// Validation
		if (!name.length) {
			FlashMessages.sendError('You need to enter a name for this network.', {
				autoHide: false
			});
			return;
		}

		Networks.update({
			_id: _id,
		}, {
			$set: {
				name: name
			}
		});

		history.back();
	}
});
