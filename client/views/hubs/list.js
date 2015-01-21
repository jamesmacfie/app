'use strict';

Template.hubList.helpers({
		hasHubs: function() {
				return !!Hubs.find().count();
		}
});
