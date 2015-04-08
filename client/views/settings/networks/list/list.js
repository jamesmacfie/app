'use strict';

Template.networkList.helpers({
	hubSummary: function() {
		var hubs = Hubs.find({
				_id: {
					$in: this.hubs
				}
			}),
			hubCount = hubs.count(),
			sensorCount = 0;

		hubs.forEach(function(h) {
			sensorCount += h.sensors.length;
		});

		return [hubCount, hubCount > 1 ? 'hubs' : 'hub', 'and', sensorCount, sensorCount > 1 ? 'sensors' : 'sensor'].join(' ');
	}
});

Template.networkList.events({
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
	}
});
