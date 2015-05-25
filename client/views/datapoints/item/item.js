'use strict';

Template.datapoint.helpers({
	getTemplate: function() {
		switch(this.type) {
			case 'temperature':
				return 'tempDatapoint';
			case 'motion':
				return 'irDatapoint';
		}
	}
});
