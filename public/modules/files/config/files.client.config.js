'use strict';

// Files module config
angular.module('files').run(['Menus',
	function(Menus) {
        Menus.addMenuItem('topbar', 'Photos', 'files', 'dropdown', '/files');
        Menus.addSubMenuItem('topbar', 'files', 'Voir les photos', 'files');
        Menus.addSubMenuItem('topbar', 'files', 'Uploader des photos', 'files/upload');
	}
]);
