'use strict';

//Setting up route
angular.module('files').config(['$stateProvider',
	function($stateProvider) {
		// Files state routing
		$stateProvider.
		state('upload', {
			url: '/files/upload',
			templateUrl: 'modules/files/views/upload.client.view.html',
            controller: function ($scope, dirs) {
                $scope.dirs = dirs;
                $scope.createFolder = null;
            },
            resolve: {
                dirs: ['Files', function (Files) {
                    return Files.Dirs.query();
                }]
            }
		}).
		state('files', {
			url: '/files',
			templateUrl: 'modules/files/views/files.client.view.html'
		});
    }
]);
