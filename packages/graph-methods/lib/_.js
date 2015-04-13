'use strict';

// REFACTOR ARGH

Meteor.methods({
	getGraphData: function(sensorId) {
		/* Please tidy this up. Super gross */
		function getTempGraphData(sensor) {


			function getValueByDate(dps, date) {
				//console.log('Checking ', date);

				var currentDataPoint,
				nextDataPoint;

				for (var i = 0, len = dps.length; i < len; i++) {
					currentDataPoint = dps[i];
					nextDataPoint = dps[i + 1];

					if (date >= currentDataPoint.createdAt && nextDataPoint === undefined) {
						return currentDataPoint.value;
					}

					//console.log('Checking against ', currentDataPoint, ' & ', nextDataPoint);

					if (date >= currentDataPoint.createdAt && date <= nextDataPoint.createdAt) {
						return currentDataPoint.value;
					}
				}

				return 0;
			}

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
				currentValue = getValueByDate(dataPoints, currentDate);
				dataPointArray.push(currentValue);
			}

			return dataPointArray;

		}
		if (!Meteor.autumnUser.canAccessSensor(this.userId, sensorId)) {
			return [];
		}

		var sensor = Sensors.findOne(sensorId);

		if (sensor.type === 't') {
			return getTempGraphData(sensor);
		}
	}
});