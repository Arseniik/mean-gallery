'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
	function($stateProvider) {
		// Admin state routing
		$stateProvider.
		state('usersList', {
			url: '/admin/users',
			templateUrl: 'modules/admin/views/users-admin.client.view.html',
            controller: function ($scope, users) {
                $scope.users = users;
                $scope.deleteUser = function (user, index) {
                    user.$remove(function (deletedUser) {
                        $scope.users.splice(index, 1);
                    });
                };
            },
            resolve: {
                users : ['Admin', function (Admin) {
                    return Admin.query();
                }]
            }
		}).
        state('userEdit', {
            url: '/admin/users/:userId',
            templateUrl: 'modules/admin/views/user-edit.client.view.html',
            controller: function ($scope, user) {
                $scope.user = user;
                $scope.editUser = function (userToUpdate) {
                    console.log('testttttt');
                    console.log(userToUpdate);
                    userToUpdate.$update(function (editedUser) {
                        $scope.success = 'L\'utilisateur a été édité';
                        $scope.user = editedUser;
                    }, function (error) {
                        $scope.error = error.data.message;
                    });
                };
            },
            resolve: {
                user: ['Admin', '$stateParams', function (Admin, $stateParams) {
                    return Admin.get({userId: $stateParams.userId}, function(user) {
                        return user;
                    });
                }]
            }
        });
	}
]);
