Template.menu.helpers({
	menuItems: function() {
		var currentRoute = Router.current(),
			routeName = currentRoute.route.getName();

		// There must be a better place to store these
		return [
			{
				class: routeName === 'home' ? 'menuItem-active' : '',
				icon: 'home',
				route: 'home',
				text: 'Home'
			},
			{
				class: routeName === 'roomList' ? 'menuItem-active' : '',
				icon: 'room',
				route: 'roomList',
				text: 'Rooms'
			},
			{
				class: routeName === 'sensoList' ? 'menuItem-active' : '',
				icon: 'filter-list',
				route: 'sensorList',
				text: 'Sensors'
			},
			{
				class: routeName === 'settings' ? 'menuItem-active' : '',
				icon: 'settings',
				route: 'settings',
				text: 'Settings'
			}
		];
	}
});
