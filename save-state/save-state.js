window.SaveState = window.SaveState || {};

(function () {
	"use strict";
	const PREFIX = "_save_state_";

	SaveState.getVar = function (name, initState) {
		var fromStorage = window.localStorage.getItem(PREFIX + name);
		var value;
		if (fromStorage) {
			value = deserialize(fromStorage);
		} else {
			value = initState;
		}
		addSaverBeforeLeavePage(name, value);
		return value;
	};

	SaveState.clear = function () {
		for (var key in window.localStorage) {
			if (startWith(key, PREFIX)) {
				window.localStorage.removeItem(key);
			}
		}
	};

	function addSaverBeforeLeavePage(name, value) {
		var oldHandler = window.onbeforeunload;
		window.onbeforeunload = function () {
			window.localStorage.setItem(PREFIX + name, serialize(value));
			if (oldHandler) {
				oldHandler();
			}
		}
	}

	function deserialize(fromStorage) {
		return JSON.parse(fromStorage).value;
	}

	function serialize(value) {
		return JSON.stringify({
			value: value
		});
	}

	function startWith(str, prefix) {
		return str.substr(0, prefix.length) === prefix;
	}
})();