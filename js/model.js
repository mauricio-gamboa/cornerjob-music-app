/*global makeAjaxRequest, qs, $on */

(function (window) {
	'use strict';

	/**
	 * Creates a new Model instance and hooks up the storage.
	 *
	 * @constructor
	 * @param {object} storage A reference to the client side storage class
	 */
	function Model(storage) {
		this.storage = storage;
	}

	/**
	 * Gets the all songs from the store.
	 * 
	 * @param  {string} term
	 * @param  {function} callback
	 */
	Model.prototype.getSongs = function (term, sortBy, callback) {
		if (term) {
			this.storage.findAll(term, sortBy, callback);
		} else {
			callback([]);
		}
	};

	/**
	 * Gets a specific song from the store.
	 * 
	 * @param  {string} trackId
	 * @param  {function} callback
	 */
	Model.prototype.getSong = function (trackId, callback) {
		if (trackId) {
			this.storage.findOne(trackId, callback);
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.Model = Model;
})(window);
