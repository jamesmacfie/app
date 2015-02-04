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
	var sensorId = this.data._id,
		dataArr = [],
		startMoment = new moment().subtract(1440, 'm'),
		seriesData = [];

	for (var i = 0; i < 1440; i++) {
		var nextDate = startMoment.add(1, 'm').toDate(),
			datapoint = DataPoints.findOne({
				sensor: sensorId,
				createdAt: {
					$lte: nextDate
				}
			}, {
				sort: {
					createdAt: -1
				}
			});

		dataArr.push(parseInt(datapoint.value));

	}

	for (var j = 0, len = dataArr.length; j < len; j += 60) {
		var count = 0;
		for (var k = j; k < j + 60; k++) {
			if (dataArr[j]) {
				count++;
			}
		}
		seriesData.push(count);
	}

	var data = {
			labels: [],
			series: [
				seriesData
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
				showGrid: false,
				scaleMinSpace: 1
			},
			classNames: {
				bar: 'ct-bar ct-bar-white'
			},
			centerBars: false
		};

	new Chartist.Bar('#chart-' + this.data._id, data, options);

// 	var template = this,
// 		yesterdaysDate = new moment().subtract(24, 'h'),
// 		todaysDataPoints = DataPoints.find({
// 			sensor: template.data._id,
// 			createdAt: {
// 				$gt: yesterdaysDate.toDate()
// 			}
// 		}, {
// 			sort: {
// 				createdAt: -1
// 			}
// 		}),
// 		seriesData = function(latestDataPoints) {
// 		// Dear god this is just the worst
// 		var startDataPoint = DataPoints.find({
// 				sensor: template.data._id,
// 				createdAt: {
// 					$lt: yesterdaysDate.toDate()
// 				}
// 			}, {
// 				sort: {
// 					createdAt: -1
// 				},
// 				limit: 1
// 			}).fetch(),
// 			latestDataPointsArr = latestDataPoints.fetch(),
// 			arr = Array.apply(null, new Array(1440)).map(function() { return false; }),
// 			lastDate  = new moment(yesterdaysDate.toDate()),
// 			value,
// 			finalData = [];
//
// 		if (!startDataPoint.length) {
// 			value = false;
// 		} else {
// 			value = startDataPoint[0].value;
// 		}
// debugger;
// 		arr.forEach(function(item, idx) {
// 			var nextDate = new moment(yesterdaysDate).add((idx * 60), 's'),
// 			currDataPoint,
// 			currDate;
//
// 			for (var i = 0; i < latestDataPointsArr.length; i++) {
// 				currDataPoint = latestDataPointsArr[i];
// 				currDate = new moment(currDataPoint.createdAt);
// 				console.log(lastDate.toDate(), currDate.toDate(), nextDate.toDate());
// 				if (currDate.isAfter(lastDate) && currDate.isBefore(nextDate) &&
// 					currDataPoint.value !== value) {
// 						value = currDataPoint.value === 'true' ? true : false;
// 						lastDate = currDate;
// 						break;
// 					}
// 				}
//
// 				arr[idx] = value;
// 			});
//
// 			for (var i = 0, len = arr.length; i < len; i += 60) {
// 				var count = 0;
// 				for (var j = i; j < i + 60; j++) {
// 					if (arr[j] === true) {
// 						count++;
// 					}
// 				}
// 				finalData.push(count);
// 			}
//
// 		return finalData;
// 	};
//
//
// 	var data = {
// 			labels: [],
// 			series: [
// 				seriesData(todaysDataPoints)
// 			]
// 		},
// 		options = {
// 			axisX: {
// 				offset: 0,
// 				showLabel: false,
// 				showGrid: false
// 			},
// 			axisY: {
// 				offset: 0,
// 				showLabel: false,
// 				showGrid: false,
// 				scaleMinSpace: 1
// 			},
// 			classNames: {
// 				bar: 'ct-bar ct-bar-white'
// 			},
// 			centerBars: false
// 		};
//
// 	new Chartist.Bar('#chart-' + this.data._id, data, options);
//
// 	console.log(seriesData(todaysDataPoints));

	// Need to change with the data here

};
