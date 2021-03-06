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
			sensor: this._id,
			type: 'temperature'
		}, {
			sort: {
				createdAt: -1
			}
		}),
		timestamp;

		if (!latest) {
			return 'No sensor readings have been taken yet';
		}

		timestamp = new moment(latest.createdAt).format('h:mm a');

		return 'Last reading taken at ' + timestamp;
	},
	latestTemp: function() {
		var sensorId = this._id,
			latest = DataPoints.findOne({
				sensor: sensorId,
				type: 'temperature'
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
	},
	avgTemp: function() {
		var sensorId = this._id,
			datapoints = DataPoints.find({
				sensor: sensorId,
				type: 'temperature'
			}).fetch(),
			datapointTotal;

		if (!datapoints.length) {
			return '--';
		}

		datapointTotal = datapoints.reduce(function(total, dp) {
			return total + parseFloat(dp.value);
		}, 0);


		return Math.round(datapointTotal / datapoints.length);
	},
	minTemp: function() {
		var sensorId = this._id,
			min = DataPoints.findOne({
				sensor: sensorId,
				type: 'temperature'
			},
			{
				sort: {
					value : 1
				}
			});

		if (min) {
			try {
				return parseFloat(min.value, 2);
			} catch(e) {
				console.error(min.value + ' is not a valid number');
				return 0;
			}
		}

		return '--';
	},
	maxTemp: function() {
		var sensorId = this._id,
			max = DataPoints.findOne({
				sensor: sensorId,
				type: 'temperature'
			},
		{
			sort: {
				value : -1
			}
		});

		if (max) {
			try {
				return parseFloat(max.value, 2);
			} catch(e) {
				console.error(max.value + ' is not a valid number');
				return 0;
			}
		}

		return '--';
	}
});

Template.tempSensorSummary.events({
	'click .js-removeSensor': function(event, view) {
		var modal = $('#roomSensorRemoveModal');
		modal.data('id', view.data._id);
		modal.openModal();
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
			sensor: this._id,
			type: 'temperature'
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
				sensor: sensorId,
				type: 'temperature'
			},
			{
				sort: {
					createdAt : -1
				},
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


Template.tempSensorSummary.rendered = function() {
	var id =  this.data._id;

	Meteor.call('getGraphData', 'temperature', id, function(err, result) {
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
		min = _.min(data.series[0]) - 15,
		max = _.max(data.series[0]) + 15,
		options = {
			low: min,
			high: max,
			lineSmooth: false,
			axisX: {
				offset: 0,
				showLabel: false,
				showGrid: false
			},
			axisY: {
				offset: 10,
				showLabel: true,
				showGrid: false,
				labelOffset: {
					x: 5,
					y: 0
				},
			},
			classNames: {
				line: 'ct-line ct-line-green',
				point: 'ct-point ct-point-green',
			},
			fullWidth: true,
			showPoint: true
		};


		new Chartist.Line('#chart-' + id, data, options);
	});
};
