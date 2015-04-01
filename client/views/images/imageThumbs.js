'use strict';

(function() {
	var selectedImage;

	Template.imageThumbs.onCreated (function() {
		if (this.data) {
			selectedImage = this.data.selectedImage;
		}
	});

	Template.imageThumbs.helpers({
		images: function() {
			return Images.find();
		}
	});

	Template.imageThumb.helpers({
		selectedClass: function() {
			if (selectedImage === undefined) {
				return '';
			}

			if (this._id === selectedImage) {
				return 'is-selected';
			}

			return '';
		}
	});
})();
