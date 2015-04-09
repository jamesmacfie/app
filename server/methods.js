'use strict';

Meteor.methods({
		insertNetwork: function(name) {
			Networks.insert({
				name: name,
				users: [this.userId]
			});
		},
		insertHub: function(hubDetails) {
			console.log(hubDetails);
			if (!hubDetails.name || !hubDetails.name.length) {
				return new Meteor.Error(400, 'Please give your new hub a memorable name.');
			}

			var hub = Hubs.findOne({
					hubId: parseInt(hubDetails.hubId)
				}),
				hubNetwork;

			if (!hub) {
				return new Meteor.Error(400, 'We can\'t find a hub with that ID. Please check the hub Id and try again.');
			}

			hubNetwork = Networks.findOne({
				hubs: {
					$in: [hub._id]
				}
			});

			if (hubNetwork) {
				return new Meteor.Error(400, 'That hub has already been added to another network. Please check the hub Id and try again.');
			}

			Networks.update(hubDetails.networkId, {
				$push: {
					hubs: hub._id
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
		insertRoomSensor: function(roomId, sensorId) {
			var room = Rooms.findOne(roomId),
				sensor = Sensors.findOne(sensorId);

			if (!room) {
				throw new Error('No room with the ID ' + roomId + 'exists');
			}

			if (!sensor) {
				throw new Error('No sensor with the ID ' + sensorId + 'exists');
			}

			if (room.sensors.indexOf(sensorId) !== -1) {
				return new Meteor.Error(400, 'That sensor already exists in this room.');
			}

			Rooms.update(room._id, {
				$push: {
					sensors: sensor._id
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
		insertSensor: function(moduleId, hubId) {
			var sensor = Sensors.findOne({
					moduleId: moduleId
				}),
				sensorHub,
				hub = Hubs.findOne(hubId);

			if (!sensor) {
				return new Meteor.Error(400, 'There\'s no sensor with that ID.');
			}

			sensorHub = Hubs.findOne({
				sensors: {
					$in: [sensor._id]
				}
			});

			if (sensorHub) {
				return new Meteor.Error(400, 'That sensor has already been assigned.');
			}
			if (!hub) {
				return new Meteor.Error(400, 'Please select a hub that this sensor will talk to.');
			}

			Hubs.update(hub._id, {
				$push: {
					sensors: sensor._id
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
		},
		adminAddSensor: function(moduleId, type) {
			if (!moduleId || !moduleId.length) {
				return new Meteor.Error(400, 'You must enter the module ID');
			}

			if (!type) {
				return new Meteor.Error(400, 'You must enter the type');
			}

			var sensor = Sensors.findOne({
					moduleId: parseInt(moduleId)
				}),
				sensorType = SensorTypes.findOne(type);

			if (sensor) {
				return new Meteor.Error(400, 'A sensor with that module ID already exists');
			}

			if (!sensorType) {
				return new Meteor.Error(400, 'Invalid sensor type :(');
			}

			return Sensors.insert({
				moduleId: moduleId,
				type: sensorType.character
			});
		}


});
