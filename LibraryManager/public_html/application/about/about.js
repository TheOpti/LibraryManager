
angular.module('lm.about', [
    'ui.router',
])

.config(
    ['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('about', {
                    abstract: true,
                    url: '/about',
                    templateUrl: 'application/about/about.html'
                })
                .state('about.info', {
                    url: '/about',
                    views: {
                        '': {
                            templateUrl: 'application/about/about.html'
                        },
                        'info@about': {
                            templateUrl: 'application/about/about.info.html',
                            controller: 'AboutInfoCtrl'
                        }
                    }
                })
        }
])

.controller('AboutInfoCtrl', ['$scope', '$state',
    function($scope, $state) {
     
        
        
    }  
])

;

