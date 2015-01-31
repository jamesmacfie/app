'use strict';

Template.sensorSummary.helpers({
	getTemplate: function() {
		switch(this.type) {
			case 't':
				return 'tempSensorSummary';
			case 'i':
				return 'irSensorSummary';
		}
	}
});

Template.tempSensorSummary.helpers({
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
				return parseFloat(latest.value, 2)
			} catch(e) {
				console.error(latest.value + ' is not a valid number');
				return 0;
			}
		}

		return '--';
	}
});

Template.tempSensorSummary.rendered = function() {

	var sensorId = this.data._id,
		dataPoints = DataPoints.find({
			sensor: sensorId
		});

	if (!dataPoints.count()) {
		return;
	}

	// Create a simple line chart
	var data = {
			labels: [],
			series: [
				dataPoints.map(function(d) {
					try {
						return parseFloat(d.value, 2)
					} catch(e) {
						console.error(d.value + ' is not a valid number');
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
		}


	new Chartist.Line('#chart-' + this.data._id, data, options);
}
