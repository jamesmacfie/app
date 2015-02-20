'use strict';

Meteor.publish('userImages', function() {
	var idMapper = function(i) {
			return i._id;
		},
		defaultImageIds = Images.find({
			'default': true,
		}, {
			sort: {
				createdAt: -1
			}
		}).map(idMapper),
		userImageIds = Images.find({
			users: {
				$in: [this.userId]
			}
		}).map(idMapper),
		allImageIds = _.union(defaultImageIds, userImageIds);

	return Images.find({
		_id: {
			$in: allImageIds
		}
	});
});
