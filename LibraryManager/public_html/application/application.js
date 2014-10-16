'use strict';

var controllers = angular.module('controllers', []);

var libraryManager = angular.module('libraryManager', [
    
]);

libraryMaganer.config(
    ['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                    .when('/', '/quick')
                    .otherwise('/');

            $stateProvider
                    .state('custom', {
                        url: '/'
                    });
        }
    ]
)