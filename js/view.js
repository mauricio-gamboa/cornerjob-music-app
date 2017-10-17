/*global makeAjaxRequest, qs, $on */

(function (window) {
	'use strict';

	/**
	     * View that abstracts away the browser's DOM completely.
	     * It has two simple entry points:
	     *
	     *   - bind(eventName, handler)
	     *     Takes a music application event and registers the handler
	     *   - render(command, parameterObject)
	     *     Renders the given command with the options
	     */
	function View(template) {
		this.template = template;

		// Home page DOM elements
		this.$songsForm = qs('.js-songs-form')
		this.$musicList = qs('.js-songs-list');
		this.$getSongsButton = qs('.js-get-songs-button');
		this.$getSongsInput = qs('.js-get-songs-input');
		this.$sortBySelect = qs('.js-sort-by-select');

		// Song page DOM elements
		this.$song = qs('.js-song');
	}

	View.prototype.render = function (viewCmd, parameter) {
		var self = this;
		var viewCommands = {
			showSongs: function () {
				self.$song.innerHTML = '';
				self.$songsForm.style.display = 'block';
				self.$musicList.innerHTML = self.template.showSongs(parameter);
			},
			showSong: function () {
				self.$musicList.innerHTML = '';
				self.$songsForm.style.display = 'none';
				self.$song.innerHTML = self.template.showSong(parameter);
			}
		};

		viewCommands[viewCmd]();
	};

	View.prototype.bind = function (event, handler) {
		var self = this;

		if (event === 'getSongs') {
			$on(self.$getSongsButton, 'click', function () {
				handler(self.$getSongsInput.value, self.$sortBySelect.value);
			});
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.View = View;
}(window));
