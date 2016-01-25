"use strict";

(function (window) {
	window.foo = function (cont) {
		var k = 0;
		for (var i = 0; i < 10e5 * cont; i++) {
			k = i;
		}
		return k;
	};

	window.measurer = StaticFunctionMeasurement.makeMeasurer(window.foo);
	window.foo = window.measurer.wrappedFunction;

	for (var i = 0; i < 10; i++) {
		window.foo(i);
	}

	console.log(window.measurer.total());
	console.log(window.measurer.count());
	console.log(window.measurer.row());
})(window);