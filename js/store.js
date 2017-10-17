/*global makeAjaxRequest, qs, $on */

(function (window) {
	'use strict';

	function Store(name) {
		this.API_URL = 'https://itunes.apple.com/';
		this.dbName = name;
	}

	/**
	 * Makes and API request using a term as search parameter.
	 * 
	 * @param  {string} term
	 * @param  {function} callback
	 */
	Store.prototype.findAll = function (term, sortBy, callback) {
		var options = {
			type: 'GET',
			url: this.API_URL + 'search?term=' + term + '&entity=song'
		};

		var _self = this;

		makeAjaxRequest(options, function (data) {
			if (sortBy) {
				data.results = _self.sortResults(data.results, sortBy);
			}

			_self.saveAll(data);

			if (callback && typeof callback === 'function') {
				callback(data);
			}
		});
	};

	/**
	 * Gets a specific song from local storage.
	 * 
	 * @param  {string} trackId
	 * @param  {function} callback
	 */
	Store.prototype.findOne = function (trackId, callback) {
		var data = JSON.parse(localStorage[this.dbName]);
		var songs = data.songs;
		var nextIndex = 0;

		var song = songs.find(function (song, index) {
			nextIndex = index + 1;
			return song.trackId == parseInt(trackId);
		});

		song.nextSongId = songs[nextIndex].trackId;

		callback(song);
	};

	/**
	 * Saves the songs in the browser's local storage.
	 * 
	 * @param  {array} data - The song's array
	 */
	Store.prototype.saveAll = function (data) {
		if (data && data.results) {
			var songs = data.results;

			var data = {
				songs: songs
			};

			localStorage[this.dbName] = JSON.stringify(data);
		}
	};
	
	/**
	 * Sorts the results by the sortBy parameter.
	 * 
	 * @param  {array} results
	 * @param  {string} sortBy
	 */
	Store.prototype.sortResults = function (results, sortBy) {
		return results.slice().sort(function (a, b) {
			if (a[sortBy] < b[sortBy]) return -1;
			if (a[sortBy] > b[sortBy]) return 1;
			return 0;
		});
	};

	// Export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
