Template.layout.events({
	'click .js-toggleMenu': function() {
		$('#pageHolder').toggleClass('menuActive');
	},
	'click .js-hideMenu': function() {
		$('#pageHolder').removeClass('menuActive');
	}
})
