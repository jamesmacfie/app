'use strict';

Template.hubList.helpers({
	hasHubs: function() {
		return !!Hubs.find().count();
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
	'click .js-listLink': function() {
		// TODO - this all has to be abstracted out to a common event on the layout
		var target = $(event.target),
			routerRef,
			routerId;

		if (!target.data('ref')) {
			target = target.parent('.js-listLink');
		}

		routerRef = target.data('ref');
		routerId = target.data('id');

		Router.go(routerRef, {
			_id: routerId
		});
	},
	'click .js-hubInsert': function() {
		$('#hubInsertModal').openModal();
	}
});
