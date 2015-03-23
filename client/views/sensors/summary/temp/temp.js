'use strict';

Template.tempSensorSummary.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		return 'Temperature';
	},
	lastReadingTimestamp: function() {
		var latest = DataPoints.findOne({
			sensor: this._id
		}, {
			sort: {
				createdAt: -1
			}
		}),
		timestamp;

		if (!latest) {
			return 'No sensor readings have been taken yet';
		}

		timestamp =  new moment(latest.createdAt).format('h:mm a');

		return 'Last reading taken at ' + timestamp;
	},
	latestTemp: function() {
		var sensorId = this._id,
			latest = DataPoints.findOne({
				sensor: sensorId
			},
		{
			sort: {
				createdAt : -1
			}
		});

		if (latest) {
			try {
				return parseFloat(latest.value, 2);
			} catch(e) {
				console.error(latest.value + ' is not a valid number');
				return 0;
			}
		}

		return '--';
	}
});

Template.tempSensorSummaryBrief.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		return 'Temperature';
	},
	lastReadingTimestamp: function() {
		var latest = DataPoints.findOne({
			sensor: this._id
		}, {
			sort: {
				createdAt: -1
			}
		}),
		timestamp;

		if (!latest) {
			return 'No sensor readings have been taken yet';
		}

		timestamp =  new moment(latest.createdAt).format('h:mm a');

		return 'Last reading taken at ' + timestamp;
	},
	latestTemp: function() {
		var sensorId = this._id,
			latest = DataPoints.find({
				sensor: sensorId
			},
			{
				sort: {
					createdAt : -1
				},
				limit: 1
			}).fetch()[0];

		if (latest) {
			try {
				return parseFloat(latest.value, 2);
			} catch(e) {
				console.error(latest.value + ' is not a valid number');
				return 0;
			}
		}

		return '--';
}
});


Template.tempSensorSummary.rendered = function() {
	return;
	
	var id =  this.data._id;

	Meteor.call('getGraphData', id, function(err, result) {
		if (err) {
			console.log(err);
			return;
		}
		if (!result.length) {
			return;
		}

		// Create a simple line chart
		var data = {
			labels: result.map(function() { return ''; }),
			series: [
			result.map(function(d) {
				try {
					return parseFloat(d, 2);
				} catch(e) {
					console.error(d + ' is not a valid number');
					return 0;
				}
			})
			]
		},
		options = {
			axisX: {
				offset: 0,
				showLabel: false,
				showGrid: false
			},
			axisY: {
				offset: 0,
				showLabel: false,
				showGrid: false
			},
			classNames: {
				line: 'ct-line ct-line-white'
			},
			fullWidth: true,
			showPoint: false
		};

		new Chartist.Line('#chart-' + id, data, options);
	});
};
