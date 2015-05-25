'use strict';

Template.irSensorSummary.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		return 'Movement';
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
			return;
		}

		timestamp =  new moment(latest.createdAt).format('h:mm a');

		return 'Last reading taken at ' + timestamp;
	},
	currentStatus: function() {
		var latest = DataPoints.findOne({
				sensor: this._id
			}, {
				sort: {
					createdAt: -1
				}
			}),
			value;

		if (!latest) {
			return '--';
		}

		try {
			value = parseInt(latest.value);
		} catch(e) {
			console.error(latest.value + ' is not a valid number');
			return 0;
		}

		if (value === 1) {
			return 'Movement detected';
		} else {
			return 'No movement detected';
		}
	}
});

Template.irSensorSummary.rendered = function() {
	// var id =  this.data._id;
	//
	// Meteor.call('getGraphData', 'motion', id, function(err, result) {
	// 	if (err) {
	// 		console.log(err);
	// 		return;
	// 	}
	//
	// 	var labels = _.pluck(result, 'date').map(function(i) {
	// 			return new moment(i).format('ha');
	// 		}),
	// 		series = _.pluck(result, 'count');
	//
	// 	var data = {
	// 			labels: labels,
	// 			series: [series]
	// 		},
	// 		options = {
	// 			low: 0,
	// 			high: 60,
	// 			axisX: {
	// 				labelOffset: {
	// 					x: 20
	// 				},
	// 				showLabel: true,
	// 				showGrid: false
	// 			},
	// 			axisY: {
	// 				showLabel: false,
	// 				showGrid: false
	// 			},
	// 			classNames: {
	// 				bar: 'ct-bar ct-bar-green'
	// 			}
	// 		};
	//
	// 		new Chartist.Bar('#chart-' + id, data, options);
	// });
};

Template.irSensorSummaryBrief.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		return 'Movement';
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
	currentStatus: function() {
		var latest = DataPoints.findOne({
				sensor: this._id
			}, {
				sort: {
					createdAt: -1
				}
			}),
			value;

		if (!latest) {
			return '--';
		}

		try {
			value = parseInt(latest.value);
		} catch(e) {
			console.error(latest.value + ' is not a valid number');
			return 0;
		}

		if (value === 1) {
			return 'Movement detected';
		} else {
			return 'No movement detected';
		}
	}
});
