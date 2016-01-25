(function () {
	"use strict";
	window.state1 = SaveState.getVar("state", {
		counter: 0
	});
	state1.counter++;
	console.log("state1", state1);

	window.state2 = SaveState.getVar("state2", {
		str: ""
	});
	state2.str += "+";
	console.log("state2", state2);
})();