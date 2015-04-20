'use strict';

Meteor.publish('avatarImages', function() {
	return Images.find({
		'default': true,
		type: 'u'
	});
});

Meteor.reactivePublish('userImages', function() {
	var idMapper = function(i) {
			return i._id;
		},
		defaultImageIds = Images.find({
				default: true,
			}, {
				sort: {
					createdAt: -1
				}
			}).map(idMapper),
		userImageIds = Images.find({
				'default': false,
				users: {
					$in: [this.userId]
				}
			}, {
				reactive: true
			}).map(idMapper),
		allImageIds = _.union(defaultImageIds, userImageIds);

	return Images.find({
		_id: {
			$in: allImageIds
		}
	});
});
