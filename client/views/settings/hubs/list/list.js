'use strict';

Template.hubList.helpers({
	hasHubs: function() {
		return !!Hubs.find().count();
	},
	hubRouteParams: function() {
		return JSON.stringify({_id: this._id});
	},
	hubSummary: function() {
		var network = Networks.findOne({
			hubs: {
				$in: [this._id]
			}
		}),
		sensorCount = this.sensors.length;

		return ['Belongs to', network.name, 'and has', sensorCount, sensorCount > 1 || sensorCount === 0 ? 'sensors' : 'sensor'].join(' ');
	}
});

Template.hubList.events({
	'click .js-hubInsert': function() {
		$('#hubInsertModal').openModal();
	}
});
