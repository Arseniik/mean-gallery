'use strict';
/* globals blueimp: false  */

angular.module('files').controller('FilesController', ['$scope', '$location', 'Files',
	function($scope, $location, Files) {
        $scope.filesPerDepth = null;
        $scope.currentFolderFiles = [];
        $scope.show = false;

        $scope.find = function() {
            $scope.filesPerDepth = Files.Files.query();
            $scope.currentFolderFiles = $scope.getFolderFiles(undefined);
        };

        $scope.setVisibleFolder = function (folder) {
            $scope.show = (folder === undefined ? false : folder.name);
            $scope.currentFolderFiles = $scope.getFolderFiles(folder);
        };

        $scope.byFolder = function(item) {
            if (item.items) {
                return item;
            }
        };

        $scope.byFile = function(item) {
            if (item.items === undefined) {
                return item;
            }
        };

        $scope.getFolderFiles = function (folder) {
            // Root folder
            if (folder === undefined) {
                var tmpArray = [];
                $scope.filesPerDepth.forEach(function (item) {
                    if (undefined !== $scope.byFile(item)) {
                        tmpArray.push(item);
                    }
                });
                $scope.currentFolderFiles = $scope.formatFilesForBlueimp({items: tmpArray});
            } else {
                $scope.filesPerDepth.some(function (item) {
                    if (item.hasOwnProperty('items') && item.name === folder.name) {
                        $scope.currentFolderFiles = $scope.formatFilesForBlueimp(folder);
                        return true;
                    }
                });
            }

            return $scope.currentFolderFiles;
        };

        $scope.formatFilesForBlueimp = function (folder) {
            var formattedFiles = [];

            folder.items.forEach(function (item) {
                formattedFiles.push( {
                    href: '/data' + (folder.name ? '/' + folder.name : '') + '/' + item.name,
                    title: folder.name
                });
            });

            return formattedFiles;
        };

        $scope.displayGallery = function ($event, folder) {
            $event = $event || window.event;
            var target = $event.target || $event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {
                    index: link,
                    event: $event,
                    container: '#blueimp-gallery-carousel',
                    carousel: true,
                    enableKeyboardNavigation : true
                },
                links = $scope.currentFolderFiles;

            if (folder === 'rootFolder' && $scope.currentFolderFiles.length === 0) {
                links = $scope.getFolderFiles(undefined);
            }

            blueimp.Gallery(links, options);
        };

        $scope.find();
	}
]);
