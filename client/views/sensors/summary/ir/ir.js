'use strict';

Template.irSensorSummary.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		return 'Movement';
	},
	currentStatus: function() {
		var latest = DataPoints.find({
				sensor: this._id
			}, {
				sort: {
					createdAt: -1
				},
				limit: 1
			}).fetch();

		if (!latest.length) {
			return '--';
		}

		if (latest[0].value === 'true') {
			return 'Movement';
		} else {
			return 'No movement';
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
		console.log(this);
		if (this.name) {
			return this.name;
		}

		return 'Movement';
	},
	currentStatus: function() {
		var latest = DataPoints.find({
			sensor: this._id
		}, {
			sort: {
				createdAt: -1
			},
			limit: 1
		}).fetch();

		if (!latest.length) {
			return '--';
		}

		if (latest[0].value === 'true') {
			return 'Movement detected';
		} else {
			return 'No movement detected';
		}
	}
});
