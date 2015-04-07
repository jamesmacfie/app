'use strict';

Router.route('/activity', {
	name: 'activity',
	data: function(){
		return DataPoints.find();
	},
	waitOn: function() {
		return [
			Meteor.subscribe('activityDataPoints')
		];
	}
});
