/*global makeAjaxRequest, qs, $on */

(function () {
	'use strict';

	/**
	 * Sets up a brand new Music App.
	 */
	function MusicApp(name) {
		this.storage = new app.Store(name);
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	var musicApp = new MusicApp('corner-job');

	function setView() {
		musicApp.controller.setView(document.location.hash);
	}

	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);
})();
