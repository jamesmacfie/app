'use strict';

Template.irSensorSummary.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		return 'Movement';
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
	/*
		For each minute, do a search
	*/
	// var sensorId = this.data._id,
	// 	dataArr = [],
	// 	startMoment = new moment().subtract(1440, 'm'),
	// 	seriesData = [];
	//
	// for (var i = 0; i < 1440; i++) {
	// 	var nextDate = startMoment.add(1, 'm').toDate(),
	// 		datapoint = DataPoints.findOne({
	// 			sensor: sensorId,
	// 			createdAt: {
	// 				$lte: nextDate
	// 			}
	// 		}, {
	// 			sort: {
	// 				createdAt: -1
	// 			}
	// 		});
	//
	// 	dataArr.push(parseInt(datapoint.value));
	//
	// }
	//
	// for (var j = 0, len = dataArr.length; j < len; j += 60) {
	// 	var count = 0;
	// 	for (var k = j; k < j + 60; k++) {
	// 		if (dataArr[k]) {
	// 			count++;
	// 		}
	// 	}
	// 	seriesData.push(count);
	// }
	//
	// var data = {
	// 		labels: [],
	// 		series: [
	// 			seriesData
	// 		]
	// 	},
	// 	options = {
	// 		axisX: {
	// 			offset: 0,
	// 			showLabel: false,
	// 			showGrid: false
	// 		},
	// 		axisY: {
	// 			offset: 0,
	// 			showLabel: false,
	// 			showGrid: false,
	// 			scaleMinSpace: 1
	// 		},
	// 		classNames: {
	// 			bar: 'ct-bar ct-bar-white'
	// 		},
	// 		centerBars: false
	// 	};
	//
	// new Chartist.Bar('#chart-' + this.data._id, data, options);
};

Template.irSensorSummaryBrief.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		return 'Movement';
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
