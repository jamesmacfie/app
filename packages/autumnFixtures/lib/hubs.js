'use strict';

if (Hubs.find().count() === 0) {
	Hubs.insert({
		hubId: 1
	});
}
