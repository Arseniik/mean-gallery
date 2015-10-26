'use strict';

// Admin module config
angular.module('admin').run(['Menus',
	function(Menus) {
        Menus.addMenuItem('topbar', 'Admin', 'admin', 'dropdown', '/admin(/users)?', false, ['admin']);
        Menus.addSubMenuItem('topbar', 'admin', 'Users list', 'admin/users');
	}
]);
