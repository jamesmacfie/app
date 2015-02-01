if (Meteor.isServer) {
	Router.route('dataPointAPi', {
		path: '/api/datapoints',
		where: 'server',
		action: function() {
			var requestMethod = this.request.method,
			requestData = this.request.body;

			if (requestMethod === 'POST') {
				this.response.writeHead(200, {'Content-Type': 'text/html'});
				this.response.end('POSTING');
			} else {
				this.response.writeHead(500, {'Content-Type': 'text/html'});
				this.response.end('Response type of ' + requestMethod + ' not supported');
			}
		}
	});
}
