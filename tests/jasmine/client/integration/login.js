'use strict';

describe('Login UI', function () {
	beforeEach(function (done) {
		Router.go('login');
		Tracker.afterFlush(done);
	});

	beforeEach(waitForRouter);

	afterEach(function(done){
		Meteor.logout(function() {
			done();
		});
	});

	it('should have a login event hook', function () {
		expect($('.js-login').length).toBe(1);
	});

	it('should have a signup link', function () {
		expect($('a[href="/signUp"]').length).toBe(1);
	});
});

describe('Login functionality', function () {
	beforeEach(function (done) {
		Router.go('login');
		Tracker.afterFlush(done);
	});

	beforeEach(waitForRouter);

	afterEach(function(done){
		Meteor.logout(function() {
			done();
		});
	});

	it('should login successfully', function () {
		var email = 'test@test.co.nz',
			password = 'test';

		$('[name="email"]').val(email);
		$('[name="password"]').val(password);

		$('.js-login').click();

		window.setTimeout(function() {
			expect(Router.current().route.path()).toBe('/');
		}, 200);

	});
});
