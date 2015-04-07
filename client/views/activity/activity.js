'use strict';

Template.activity.helpers({
	hasDataPoints: function() {
		return !!DataPoints.find().count();
	}
});
