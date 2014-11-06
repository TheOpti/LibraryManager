
angular.module('lm.main', [
    'ui.router',
])

.config(
    ['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('main', {
                    abstract: true,
                    url: '/main',
                    templateUrl: 'application/main/main.html'
                })
                .state('main.info', {
                    url: '/main',
                    views: {
                        '': {
                            templateUrl: 'application/main/main.html'
                        },
                        'info@main': {
                            templateUrl: 'application/main/main.info.html',
                            controller: 'MainInfoCtrl'
                        }
                    }
                })
        }
])

.controller('MainInfoCtrl', ['$scope', '$state',
    function($scope, $state) {
     
        
        
    }  
])

;
