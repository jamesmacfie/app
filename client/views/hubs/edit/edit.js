'use strict';

Template.hubEdit.events({
	'click .js-removeHub': function() {
		$('#removeHubModal').openModal();
	}
});
