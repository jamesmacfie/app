(function() {
	'use strict';

	function getValueByDate(dps, date, fallback) {
		var currentDataPoint,
			nextDataPoint;

		for (var i = 0, len = dps.length; i < len; i++) {
			currentDataPoint = dps[i];
			nextDataPoint = dps[i + 1];

			if (date >= currentDataPoint.createdAt && nextDataPoint === undefined) {
				return currentDataPoint.value;
			}

			if (date >= currentDataPoint.createdAt && date <= nextDataPoint.createdAt) {
				return parseFloat(currentDataPoint.value);
			}
		}

		return fallback;
	}

	function getMaxByDateRange(dps, startDate, endDate, fallback) {
		var rangeDataPoints = [],
			currentDataPoint;

		for (var i = 0, len = dps.length; i < len; i++) {
			currentDataPoint = dps[i];

			if (startDate < currentDataPoint.createdAt && endDate > currentDataPoint.createdAt) {
				console.log(startDate, endDate, currentDataPoint.createdAt);
				rangeDataPoints.push(parseInt(currentDataPoint.value));
			}
		}

		return rangeDataPoints.length ? _.max(rangeDataPoints) : fallback;
	}

	function getTempGraphData(sensor) {
		var oneHourAgo = new moment().subtract(1, 'h').toDate(),
			startDatapoint = DataPoints.findOne({
				sensor: sensor._id,
				createdAt: {
					$gte: oneHourAgo
				}
			}, {
				sort: {
					createdAt: 1
				}
			}),
			dataPoints,
			dataPointArray = [],
			startingMoment,
			timespanIncrements,
			currentDate,
			currentValue;

		if (!startDatapoint) {
			startDatapoint = DataPoints.findOne({
					sensor: sensor._id
				},
			{
				sort: {
					createdAt: 1
				}
			});

			if (!startDatapoint) {
				return [];
			}

			startDatapoint.createdAt = oneHourAgo;
		}

		dataPoints = DataPoints.find({
			sensor: sensor._id,
			createdAt: {
				$gte: startDatapoint.createdAt
			}
		}, {
			sort: {
				createdAt: 1
			}
		}).fetch();

		if (!dataPoints.length) {
			dataPoints.push(startDatapoint);
			startingMoment = new moment(startDatapoint.createdAt);
			timespanIncrements = new moment().diff(startingMoment, 'm');
		} else {
			startingMoment = new moment(dataPoints[0].createdAt);
			timespanIncrements = new moment().diff(startingMoment, 'm');
		}


		for (var i = 0; i < timespanIncrements; i += 2) {
			currentDate = startingMoment.add(2, 'm').toDate();
			currentValue = getValueByDate(dataPoints, currentDate, 0);
			dataPointArray.push(currentValue);
		}

		return dataPointArray;

	}

	function getIRGraphData(sensor) {
		function formatResult(value, date) {
			return {
				value: value,
				date: date
			};
		}

		var twelveHoursAgo = new moment().utc().subtract(12, 'h'),
			currentGreaterThan,
			currentLessThan,
			dataPoints,
			hourMinutesArray,
			currentHourMinute,
			dataPointArray = [];

			twelveHoursAgo.set('m', 0);
			twelveHoursAgo.set('s', 0);

			for (var i = 0; i < 12; i++) {
				hourMinutesArray = [];

				currentGreaterThan = new moment(twelveHoursAgo).add(i, 'h');
				currentLessThan = new moment(twelveHoursAgo).add(i + 1, 'h');

				dataPoints = DataPoints.find({
					sensor: sensor._id,
					createdAt: {
						$gte: currentGreaterThan.toDate(),
						$lte: currentLessThan.toDate()
					}
				}).fetch();

				for (var j = 0; j < 60; j++) {

					currentHourMinute = getMaxByDateRange(dataPoints,
						new moment(currentGreaterThan).add(j, 'm').toDate(),
						new moment(currentGreaterThan).add(j + 1, 'm').toDate(),
						0);

					hourMinutesArray.push(currentHourMinute);
				}

				dataPointArray.push(formatResult(_.filter(hourMinutesArray, function(i) {
					return i !== 0;
				}).length, currentGreaterThan.toDate()));
			}



			/*
			For each hour:
				For each minute
					Get the first item from the start of the minute
					Get the last item from the end of the minute
						Any items 1? Add 1.


			*/

			// startDatapoint = DataPoints.findOne({
			// 	sensor: sensor._id,
			// 	createdAt: {
			// 		$gte: oneDayAgo.toDate()
			// 	}
			// }, {
			// 	sort: {
			// 		createdAt: 1
			// 	}
			// });

			// dataPoints = DataPoints.find({
			// 	sensor: sensor._id,
			// 	createdAt: {
			// 		$gte: startDatapoint.createdAt
			// 	}
			// }, {
			// 	sort: {
			// 		createdAt: 1
			// 	}
			// }).fetch();
			//
			// if (!dataPoints.length) {
			// 	dataPoints.push(startDatapoint);
			// 	startingMoment = new moment(startDatapoint.createdAt);
			// 	timespanIncrements = new moment().diff(startingMoment, 'm');
			// } else {
			// 	startingMoment = new moment(dataPoints[0].createdAt);
			// 	timespanIncrements = new moment().diff(startingMoment, 'm');
			// }
			//
			//
			// for (var i = 0; i < timespanIncrements; i += 2) {
			// 	currentDate = startingMoment.add(2, 'm').toDate();
			// 	currentValue = getValueByDate(dataPoints, currentDate, 0);
			// 	dataPointArray.push(currentValue);
			// }

			return dataPointArray;
	}

	Meteor.methods({
		getGraphData: function(sensorId) {
			/* Please tidy this up. Super gross */

			if (!Meteor.autumnUser.canAccessSensor(this.userId, sensorId)) {
				return [];
			}

			var sensor = Sensors.findOne(sensorId);

			if (sensor.type === 't') {
				return getTempGraphData(sensor);
			} else if (sensor.type === 'i') {
				return getIRGraphData(sensor);
			}
		}
	});


})();
