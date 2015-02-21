'use strict';
(function() {
	var backgroundImageStyle = function() {
		if (this.image) {
			var image = Images.findOne(this.image);
			return 'background-image: url(\'/images/roomBackgrounds/' + image.url + '\');';
		}
	};

	Template.roomSummary.helpers({
		backgroundImageStyle: backgroundImageStyle
	});

	Template.roomSummaryBrief.helpers({
		backgroundImageStyle: backgroundImageStyle,
		roomSensors: function() {
			return Sensors.find({
				_id: {
					$in: this.sensors
				}
			});
		}

	});
})();
