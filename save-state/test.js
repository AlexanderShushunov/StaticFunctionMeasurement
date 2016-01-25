(function () {
	"use strict";
	window.state = SaveState.getVar("state", {
		counter: 0
	});
	state.counter++;
	console.log(state);
})();