(function (window) {
	'use strict';

	// Make Ajax requests.
	window.makeAjaxRequest = function (options, callback) {
		var request = new XMLHttpRequest();
		
		request.open(options.type, options.url, true);

		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				if (callback && typeof callback === 'function') {
					callback(JSON.parse(request.responseText));
				} else {
					console.error('Provide a valid callback function.');
				}
			} else {
				// We reached our target server, but it returned an error
				console.error('There was an error.');
			}
		};

		request.onerror = function () {
			// There was a connection error of some sort
			console.error('There was an error.');
		};

		request.send();
	};

	// Get element(s) by CSS selector:
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};

	// addEventListener wrapper:
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};
})(window);
