/*global makeAjaxRequest, qs, $on */

(function (window) {
	'use strict';

	/**
	 * Takes a model and view and acts as the controller between them
	 *
	 * @constructor
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	function Controller(model, view) {
		var self = this;
		self.model = model;
		self.view = view;

		self.view.bind('getSongs', function (term, sortBy) {
			self.getSongs(term, sortBy);
		});
	}

	/**
	 * Loads and initializes the view
	 * 
	 * @param  {string} locationHash
	 */
	Controller.prototype.setView = function (locationHash) {
		var urlBody = locationHash.split('/');
		var route = urlBody[1];
		var page = route || 'home';

		switch (page) {
			case 'song':
				var id = urlBody[2];
				this.getSong(id);
				break;
			default:
				this.getSongs();
		}
	};

	/**
	 * Calls the model getSongs function with the appropriate params.
	 * 
	 * @param  {string} term
	 * @param  {string} sortBy
	 */
	Controller.prototype.getSongs = function (term, sortBy) {
		var self = this;
		self.model.getSongs(term, sortBy, function (data) {
			self.view.render('showSongs', data.results ? data.results : data);
		});
	};

	/**
	 * Calls the model getSong function with the appropriate param.
	 * 
	 * @param  {string} id
	 */
	Controller.prototype.getSong = function (id) {
		var self = this;
		self.model.getSong(id, function (data) {
			self.view.render('showSong', data);
		});
	};

	// Export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
