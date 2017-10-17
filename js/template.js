/*global makeAjaxRequest, qs, $on */

(function (window) {
	'use strict';

	var htmlEscapes = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&#x27;',
		'`': '&#x60;'
	};

	var escapeHtmlChar = function (chr) {
		return htmlEscapes[chr];
	};

	var reUnescapedHtml = /[&<>"'`]/g;

	var reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

	var escape = function (string) {
		return (string && reHasUnescapedHtml.test(string))
			? string.replace(reUnescapedHtml, escapeHtmlChar)
			: string;
	};

	var millisToMinutesAndSeconds = function (millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	};

	var getReleaseDate = function (date) {
		var dateObject = new Date(Date.parse(date));
		return dateObject.toDateString();
	};

	/**
	 * Sets up defaults for all the Template methods such as a default template
	 *
	 * @constructor
	 */
	function Template() {
		this.defaultSongTemplate
			= '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'
			+ '<div class="thumbnail">'
			+ '<img src="{{artworkUrl100}}" class="img-responsive" style="width: 100%;" />'
			+ '<div class="caption">'
			+ '<h4 class="ellipis">{{trackName}} <small>by {{artistName}}</small></h4>'
			+ '<p><strong>Album:</strong> {{collectionName}}</p>'
			+ '<p><strong>Genre:</strong> {{primaryGenreName}}</p>'
			+ '<p><strong>Release date:</strong> {{releaseDate}}</p>'
			+ '<p><strong>Length:</strong> {{trackTimeMillis}} min</p>'
			+ '<p><strong>Price:</strong> ${{trackPrice}}</p>'
			+ '<a href="#/song/{{trackId}}" class="btn btn-primary btn-block">See More</a>'
			+ '</div>'
			+ '</div>'
			+ '</div>';

		this.songTemplate
			= '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'
			+ '<div class="thumbnail">'
			+ '<img src="{{artworkUrl100}}" class="img-responsive" style="width: 100%;" />'
			+ '<div class="caption">'
			+ '<h4 class="ellipis">{{trackName}} <small>by {{artistName}}</small></h4>'
			+ '<p><strong>Album:</strong> {{collectionName}}</p>'
			+ '<p><strong>Genre:</strong> {{primaryGenreName}}</p>'
			+ '<p><strong>Release date:</strong> {{releaseDate}}</p>'
			+ '<p><strong>Length:</strong> {{trackTimeMillis}} min</p>'
			+ '<p><strong>Price:</strong> ${{trackPrice}}</p>'
			+ '</div>'
			+ '<audio autoplay controls preload="none">'
			+ '<source src="{{previewUrl}}" type="audio/x-m4a">'
			+ '</audio>'
			+ '<div><a href="#/song/{{nextSongId}}" class="btn btn-primary btn-block">Next Track</a></div>'
			+ '</div>'
			+ '</div>';
	}

	/**
	 * Replaces the place holders in the songs template with the real data.
	 * 
	 * @param  {array} data
	 */
	Template.prototype.showSongs = function (data) {
		var i, l;
		var view = '';

		for (i = 0, l = data.length; i < l; i++) {
			var template = this.defaultSongTemplate;

			template = template.replace('{{trackId}}', data[i].trackId);
			template = template.replace('{{trackName}}', escape(data[i].trackName));
			template = template.replace('{{artistName}}', data[i].artistName);
			template = template.replace('{{collectionName}}', escape(data[i].collectionName) || 'No title');
			template = template.replace('{{releaseDate}}', getReleaseDate(data[i].releaseDate));
			template = template.replace('{{artworkUrl100}}', data[i].artworkUrl100);
			template = template.replace('{{trackTimeMillis}}', millisToMinutesAndSeconds(data[i].trackTimeMillis));
			template = template.replace('{{primaryGenreName}}', data[i].primaryGenreName);
			template = template.replace('{{trackPrice}}', data[i].trackPrice);
			template = template.replace('{{primaryGenreName}}', data[i].primaryGenreName);
			view = view + template;
		}

		return view;
	};

	/**
	 * Replaces the place holders in the song template with the real data.
	 * 
	 * @param  {object} song
	 */
	Template.prototype.showSong = function (song) {
		var view = '';
		var template = this.songTemplate;

		template = template.replace('{{trackName}}', escape(song.trackName));
		template = template.replace('{{previewUrl}}', song.previewUrl);
		template = template.replace('{{artistName}}', song.artistName);
		template = template.replace('{{collectionName}}', escape(song.collectionName) || 'No title');
		template = template.replace('{{releaseDate}}', getReleaseDate(song.releaseDate));
		template = template.replace('{{artworkUrl100}}', song.artworkUrl100);
		template = template.replace('{{trackTimeMillis}}', millisToMinutesAndSeconds(song.trackTimeMillis));
		template = template.replace('{{primaryGenreName}}', song.primaryGenreName);
		template = template.replace('{{trackPrice}}', song.trackPrice);
		template = template.replace('{{primaryGenreName}}', song.primaryGenreName);
		template = template.replace('{{nextSongId}}', song.nextSongId);
		view = view + template;

		return view;
	};

	// Export to window
	window.app = window.app || {};
	window.app.Template = Template;
})(window);
