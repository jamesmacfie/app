'use strict';

(function() {
	var selectedImage;

	Template.imageThumbs.helpers({
		setSelectedImage: function() {
			selectedImage = this.selectedImage;
		},
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
				return 'thumb-selected js-imageSelected';
			}

			return '';
		}
	});
})();
