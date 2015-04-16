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
			console.log(this.type)
			return Images.find({
				type: this.type || 'r'
			});
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
