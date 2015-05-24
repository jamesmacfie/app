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
			currentDataPoint,
			currentValue;

		for (var i = 0, len = dps.length; i < len; i++) {
			currentDataPoint = dps[i];

			if (currentDataPoint.createdAt < startDate) {
				currentValue = currentDataPoint.value;
			}

			if (startDate < currentDataPoint.createdAt && endDate > currentDataPoint.createdAt) {
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

	function getTimeBoxedDataPoints(sensorId, startDate, endDate) {
		return DataPoints.find({
			sensor: sensorId,
			createdAt: {
				$gte: startDate,
				$lte: endDate
			}
		});
	}

	function getLastTwelveHoursDataPoints(sensorId, currentTime) {
		var twelveHoursAgo = new moment(currentTime).utc().subtract(12, 'h'),
			currentGreaterThan,
			currentLessThan,
			dataPoints,
			dataPointArray = [];

		for (var i = 0; i < 12; i++) {
			currentGreaterThan = new moment(twelveHoursAgo).add(i, 'h');
			currentLessThan = new moment(twelveHoursAgo).add(i + 1, 'h');

			dataPoints = getTimeBoxedDataPoints(sensorId, currentGreaterThan.toDate(), currentLessThan.toDate()).fetch();
			dataPointArray.push(dataPoints);
		}

		return dataPointArray;
	}

	function getQuarterDataPoints(datapoints, currentTime) {
		var startTime = new moment(currentTime).utc(),
			 returnDps = [];

		datapoints.forEach(function(dp, idx) {
			var hourDps,
				quarteredDps = [],
				currentDataPoints = datapoints[idx],
				currentDataPoint,
				greaterThan,
				lessThan;

			for (var i = 0; i < 4; i++) {
				hourDps = [];

				greaterThan = new moment(startTime).add(idx, 'h').add(i * 15, 'm').toDate();
				lessThan = new moment(startTime).add(idx, 'h').add((i * 15) + 15, 'm').toDate();

				for (var j = 0, len = currentDataPoints.length; j < len; j++) {
					currentDataPoint = currentDataPoints[j];
					if (currentDataPoint.createdAt >= greaterThan && currentDataPoint.createdAt <= lessThan) {
						hourDps.push(currentDataPoint);
					}
				}

				quarteredDps.push({
					date: greaterThan,
					dps: hourDps
				});
			}

			returnDps.push(quarteredDps);

		});


		return returnDps;
	}

	function getIRGraphData(sensor) {
		var currentTime = new moment();

		currentTime.set('m', 0);
		currentTime.set('s', 0);

		// NOTE: this doesn't work
		var allDataPoints = getLastTwelveHoursDataPoints(sensor._id, currentTime),
			quarterDataPoints = getQuarterDataPoints(allDataPoints, currentTime.subtract(12, 'h')),
			quarteredCount = quarterDataPoints.map(function(h) {
				var startTime = new moment(h[0].date).utc();
				return {
					date: startTime.toDate(),
					count: h.map(function(q) {
						var returnCount = 0,
							greaterThan,
							lessThan;

						for (var i = 0; i < 15; i++) {
							greaterThan = new moment(startTime).add(i, 'm').toDate();
							lessThan = new moment(startTime).add(i, 'm').toDate();

							if (getMaxByDateRange(q.dps, greaterThan, lessThan, 0)) {
								returnCount++;
							}
						}
						return returnCount;
					})
				};
			});

			return quarteredCount;
	}

	Meteor.methods({
			getGraphData: function(sensorId) {
			/* Please tidy this up. Super gross */

			if (!Meteor.autumnUser.canAccessSensor(this.userId, sensorId)) {
				return [];
			}

			var sensor = Sensors.findOne(sensorId);

			if (sensor.type === 'temperature') {
				return getTempGraphData(sensor);
			} else if (sensor.type === 'motion') {
				return getIRGraphData(sensor);
			}
		}
	});


})();
