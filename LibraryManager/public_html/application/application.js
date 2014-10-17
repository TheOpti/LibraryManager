'use strict';

var controllers = angular.module('controllers', []);

var libraryManager = angular.module('libraryManager', [
    'ui.router',
    
    'controllers',
    
    'lm.books',
    'lm.about',
    'lm.main'
    
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