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
			return Images.find({
				type: this.type || 'r'
			});
		}
	});

	Template.imageThumbs.events({
		'click .js-selectImage': function(event, view) {
			var currentlySelected = view.find('.is-selected');

			if (currentlySelected) {
				jQuery(currentlySelected).removeClass('is-selected');

				if (currentlySelected === event.target) {
					// Deselecting the current image
					return;
				}
			}

			jQuery(event.currentTarget).addClass('is-selected');
		}
	});

	Template.imageThumb.helpers({
		getUrl: function() {
			if (!this.type || this.type === 'r') {
				return '/images/roomBackgrounds/' + this.thumbUrl;
			} else if (this.type === 'u') {
				return '/images/avatars/' + this.thumbUrl;
			}

			return 'Huh?';
		},
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
