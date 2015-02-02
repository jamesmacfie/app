'use strict';

Template.irSensorSummary.helpers({
	nickname: function() {
		if (this.name) {
			return this.name;
		}

		return 'Movement';
	}
});

Template.irSensorSummary.rendered = function() {
	// Dear god this is just the worst
	var yesterdaysDate = new moment().subtract(24, 'h'),
		startDataPoint = DataPoints.find({
			sensor: this.data._id,
			createdAt: {
				$lt: yesterdaysDate.toDate()
			}
		}, {
			sort: {
				createdAt: -1
			},
			limit: 1
		}).fetch(),
		todaysDataPoints = DataPoints.find({
			sensor: this.data._id,
			createdAt: {
				$gt: yesterdaysDate.toDate()
			}
		}, {
			sort: {
				createdAt: -1
			}
		}).fetch(),
		arr = Array.apply(null, new Array(1440)).map(function() { return false; }),
		lastDate = lastDate = new moment(yesterdaysDate.toDate()),
		value,
		finalData = [];

	if (!startDataPoint.length) {
		value = false;
	} else {
		value = startDataPoint[0].value;
	}

	arr.forEach(function(item, idx) {
		var nextDate = new moment(yesterdaysDate).add((idx * 60), 's'),
			currDataPoint,
			currDate;

		for (var i = 0; i < todaysDataPoints.length; i++) {
			currDataPoint = todaysDataPoints[i];
			currDate = new moment(currDataPoint.createdAt);
			if (currDate.isAfter(lastDate) && currDate.isBefore(nextDate) &&
				currDataPoint.value !== value) {
				value = currDataPoint.value === 'true' ? true : false;
				lastDate = currDate;
				break;
			}
		}

		arr[idx] = value;
	});

	for (var i = 0, len = arr.length; i < len; i += 60) {
		var count = 0;
		for (var j = i; j < i + 60; j++) {
			if (arr[j] === true) {
				count++;
			}
		}
		finalData.push(count);
	}

	var data = {
		labels: [],
			series: [
				finalData
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

};
