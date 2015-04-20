(function (Meteor, Tracker, Router) {
	var isRouterReady = false;
	var callbacks = [];

	window.waitForRouter = function (callback) {
		if (isRouterReady) {
			callback();
		} else {
			callbacks.push(callback);
		}
	};

	Router.onAfterAction(function () {
		if (!isRouterReady && this.ready()) {
			Tracker.afterFlush(function () {
				isRouterReady = true;
				callbacks.forEach(function (callback) {
					callback();
				});
				callbacks = [];
			});
		}
	});

	Router.onRerun(function () {
		isRouterReady = false;
		this.next();
	});

	Router.onStop(function () {
		isRouterReady = false;
		if (this.next) {
			this.next();
		}
	});


	if (Meteor.users.find({
		email: {
			$in: ['test@test.co.nz']
		}
	}).count() === 0) {
		var id = Accounts.createUser({
			email: 'test@test.co.nz',
			password: 'test',
			profile: {
				name: 'Test User'
			}
		});

		console.log('User added', id);

	}

})(Meteor, Tracker, Router);
