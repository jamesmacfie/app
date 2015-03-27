'use strict';
(function() {
	Template.roomSummary.helpers({
		backgroundImageStyle: function() {
			if (this.image) {
				var image = Images.findOne(this.image);
				return 'background-image: url(\'/images/roomBackgrounds/' + image.url + '\');';
			}
		},
		sensorCount: function() {
			return !!Sensors.find({
				_id: {
					$in: this.sensors
				}
			}).count();
		},
		sensorObjects: function() {
			return Sensors.find({
				_id: {
					$in: this.sensors
				}
			});
		}
	});

	Template.roomSummary.events({
		'click': function(event, view) {
			var roomId = view.data._id;

			Router.go('room', {
				_id: roomId
			});
		}
	});
})();
