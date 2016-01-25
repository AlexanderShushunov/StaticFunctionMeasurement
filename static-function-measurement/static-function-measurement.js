"use strict";

window.StaticFunctionMeasurement = window.StaticFunctionMeasurement || {};
(function (StaticFunctionMeasurement) {
	StaticFunctionMeasurement.makeMeasurer = function (func) {
		var suffix = generateSuffix(func);
		var startMark = 'mark_start_' + suffix;
		var markEnd = 'mark_end_' + suffix;
		var result = 'result_' + suffix;
		return {
			wrappedFunction: function () {
				window.performance.mark(startMark);
				var ret = func.apply(this, arguments);
				window.performance.mark(markEnd);
				window.performance.measure(result, startMark, markEnd);
				return ret;
			},
			total: function () {
				var measures = window.performance.getEntriesByName(result);
				return measures.reduce(function (total, current) {
					return total + current.duration;
				}, 0);
			},
			count: function () {
				var measures = window.performance.getEntriesByName(result);
				return measures.length;
			},
			row: function () {
				return window.performance.getEntriesByName(result);
			}
		}
	};

	function generateSuffix(func) {
		return func.name + Math.random();
	}

})(window.StaticFunctionMeasurement);