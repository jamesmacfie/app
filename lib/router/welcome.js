'use strict';

Router.route('/welcome/networkInsert', {
	name: 'welcomeNetworkInsert',
	onBeforeAction: function() {
		if (Networks.find().count()) {
			Router.go('home');
		}
	},
	data: function() {
		return {
			pageCls: 'page--alt'

		};
	},
	waitOn: function() {
		return [
		Router.globalSubscription.subscribe('userNetworks')
		];
	}
});

Router.route('/welcome/hubInsert', {
	name: 'welcomeHubInsert',
	// onBeforeAction: function() {
	// 	// if (Hubs.find().count()) {
	// 	// 	Router.go('home');
	// 	// }
	// },
	data: function() {
		return {
			pageCls: 'page--alt'
		};
	},
	waitOn: function() {
		return [
			Router.globalSubscription.subscribe('userNetworks'),
			Router.globalSubscription.subscribe('userHubs')
		];
	}
});
