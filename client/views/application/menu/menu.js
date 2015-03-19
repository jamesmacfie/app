'use strict';

Template.menu.helpers({
	menuItems: function() {
		function getActiveClass(name) {
			var currentRoute = Router.current(),
			routeName = currentRoute.route.getName();

			return routeName === name ? 'isActive' : '';
		}

		// There must be a better place to store these
		return [
			{
				class: getActiveClass('home'),
				icon: 'home',
				route: 'home',
				text: 'Home'
			},
			{
				class: getActiveClass('roomList'),
				icon: 'room',
				route: 'roomList',
				text: 'Rooms'
			},
			{
				class: getActiveClass('sensorList'),
				icon: 'filter-list',
				route: 'sensorList',
				text: 'Sensors'
			},
			{
				class: getActiveClass('activity'),
				icon: 'chat',
				route: 'activity',
				text: 'Activity'
			},
			{
				class: getActiveClass('settings'),
				icon: 'settings',
				route: 'settings',
				text: 'Settings'
			}
		];
	}
});
