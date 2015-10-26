'use strict';

angular.module('files').factory('Files', ['$resource',
	function($resource) {
        return {
            Files: $resource('files', {}, {
                list: {
                    method: 'GET'
                }
            }),
            Dirs: $resource('files/dirs', {}, {
                getFolders: {
                    method: 'GET'
                }
            })
        }
	}
]);
