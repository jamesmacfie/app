'use strict';

(function() {
	var selectedImage;

	Template.imageThumbs.onCreated (function() {
		selectedImage = this.data.selectedImage;
	});

	Template.imageThumbs.helpers({
		images: function() {
			console.log(this.showCamera);
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
