'use strict';

Meteor.methods({
		insertNetwork: function(network) {
			console.log(this.userId);
			var networkData = _.extend(network, {
					users: [this.userId]
			});

			Networks.insert(networkData);
		},
		insertHub: function(hubDetails) {
				var network = Networks.findOne(hubDetails.network),
					hub,
					hubId;

				hub = Hubs.findOne({
					hubId: hubDetails.hubId
				});

				if (hub) {
					console.log('Hub already exists'); // Better error message
					return;
				}

				hubId = Hubs.insert({
					hubId: hubDetails.hubId,
					name: hubDetails.name
				});

				Networks.update(network._id, {
					$push: {
						hubs: hubId
					}
				});

		},
		insertRoom: function(room) {
			var roomData = _.extend(room, {
					users: [this.userId]
				}),
				id;

			id = Rooms.insert(roomData);
			return id;
		},
		updateRoom: function(room, query, id) {
			// Man, def need some sort of validation here
			return Rooms.update(id, query);
		},
		removeRoom: function(id) {
			Rooms.remove({
				_id: id
			});
		},
		insertRoomSensor: function(sensorId, roomId) {
			var room = Rooms.findOne(roomId);

			if (!room) {
				return;
			}

			if (room.sensors === undefined) {
				Rooms.update(room._id, {
					$set: {
						sensors: []
					}
				});
			}

			Rooms.update(room._id, {
				$push: {
					sensors: sensorId
				}
			});
		},
		removeRoomSensor: function(sensorId, roomId) {
			var room = Rooms.findOne(roomId);

			if (!room) {
				return;
			}

			Rooms.update(room._id, {
				$pull: {
					sensors: sensorId
				}
			});
		},
		insertSensor: function(sensor) {
			// Does this module already exist
			var existingSensor = Sensors.findOne({
					moduleId: sensor.moduleId
				}),
				hub = Hubs.findOne(sensor.hub),
				sensorId;

			if (existingSensor) {
				return false;
			}

			delete sensor.hub;

			sensorId = Sensors.insert(sensor);

			Hubs.update(hub._id, {
				$push: {
					sensors: sensorId
				}
			});
		},
		insertDataPoint: function(params) {
			console.log('insertDataPoint');
			console.log(arguments);
			try {
				var sensor = Sensors.findOne({
						moduleId: parseInt(params.moduleId)
					}),
					moduleId = params.moduleId,
					value = params.value;

				if (!sensor) {
					console.log('No sensor with the mooduleId `' + moduleId + '` found');
					return;
				}

				if (value === undefined) {
					console.log('A dataPoint value needs to be passed through');
					return;
				}

				DataPoints.insert({
					sensor: sensor._id,
					value: value
				});

			} catch(e) {
				console.log('Something went terribly wrong' + e.message);
			}
		},
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
					startDatapoint.createdAt = oneHourAgo;
				}

				if (!startDatapoint) {
					return [];
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
		},
		insertFakeTempData: function(id, config) {
			var options = {
					range: 5,
					start: 20,
					time: 120
				},
				tempSensor = Sensors.findOne({
					_id: id
				});

			if (!tempSensor) {
				throw new Error('No sensor found');
			}

			_.extend(options, config);

			for (var i = 0, len = options.time; i < len; i++) {
				DataPoints.insert({
					sensor: id,
					value: Math.ceil(Math.random() * options.range) + options.start,
					createdAt: new moment().subtract(i, 'm').toDate()
				});
			}
		}

});
