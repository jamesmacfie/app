'use strict';

Template.imageThumbs.helpers({
	images: function() {
		return Images.find();
	}
});
