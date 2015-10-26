'use strict';

angular.module('files').filter('checkFolder', [
	function() {
		return function(input) {
			return (input.indexOf('.') < 0 ? 'folder' : 'picture');
		};
	}
]);
