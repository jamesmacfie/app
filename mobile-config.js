'use strict';

App.info({
	id: 'com.meteor.autumn',
	name: 'Autumn',
	description: 'Autumn home automation',
	author: 'James Macfie',
	email: 'jamse@macfie.co.nz',
	website: 'http://jamesmacfie.com'
});

App.icons({
	// Android
	'android_ldpi': 'resources/icon-36.png',
	'android_mdpi': 'resources/icon-48.png',
	'android_hdpi': 'resources/icon-72.png',
	'android_xhdpi': 'resources/icon-96.png'
});

App.accessRule(
	'*',
	{
		launchExternal: false
	}
);

// App.launchScreens({
// 	// Android
// 	'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
// 	'android_ldpi_landscape': 'resources/splash/splash-320x200.png',
// 	'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
// 	'android_mdpi_landscape': 'resources/splash/splash-480x320.png',
// 	'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
// 	'android_hdpi_landscape': 'resources/splash/splash-800x480.png',
// 	'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png',
// 	'android_xhdpi_landscape': 'resources/splash/splash-1280x720.png'
// });
