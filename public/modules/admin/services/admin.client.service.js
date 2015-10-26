'use strict';

angular.module('admin').factory('Admin', ['$resource',
	function ($resource) {

		return $resource('admin/users/:userId', {userId: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
