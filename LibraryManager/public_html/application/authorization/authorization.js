
angular.module('lm.authorization', [
    'ui.router',
    'ngResource',
    'LocalStorageModule',
])

.factory('AuthService', ['$resource',
    function($resource) {
        return $resource('http://localhost:8080/login', {}, {
            login: {method: 'POST', headers: {'Content-Type': 'application/json'}, isArray: false },
        });
    }
])

.factory('LoginFactory', ['localStorageService',
    function(localStorageService) {
        
        var authServiceFactory = {};
        
        authServiceFactory.saveToken = function(token) {
            localStorageService.clearAll();
            localStorageService.set('authorizationData', {token: token.token, user: token.user});
        };
        
        authServiceFactory.getToken = function() {
            return localStorageService.get('authorizationData');
        };
        
        authServiceFactory.logOff = function() {
            localStorageService.remove('authorizationData');
            localStorageService.clearAll();
        };
        
        return authServiceFactory;
    }
])

.controller('AuthorizationCtrl', ['$scope', '$state', 'AuthService', 'LoginFactory',
    function($scope, $state, AuthService, LoginFactory) {
        
        $scope.user = {
            login: null,
            password: null
        };
        
        $scope.data = {
            login : 'wieckowp',
            password : 'wieckowp'
        };

        $scope.login = function() {
            AuthService.login({}, $scope.user, function(resp) {
                if (resp.error) {
                    alert("Incorrect user or password!");
                    return;
                }
                LoginFactory.saveToken(resp);
                $state.go('main.info');
            });
        };
        
        $scope.logout = function() {
            LoginFactory.logOff();
        };
        
        $scope.isLogged = function() {
            var authData = LoginFactory.getToken();
            if (authData !== null) {
                return authData.token !== null ? true : false;
            }
            return false;
        };
        
    }
])

.factory('sessionInjector', ['localStorageService',
    function(localStorageService) {  
        var sessionInjector = {
            request: function(config) {
                config.headers = config.headers || {};
                var authData = localStorageService.get('authorizationData');
                if(authData !== null && authData.token !== null) {
                    config.headers.auth_bearer = authData.token;
                }
                return config;
            }
        };
        return sessionInjector;
    }
])

.config(['$httpProvider', 
    function($httpProvider) {  
        $httpProvider.interceptors.push('sessionInjector');
    }
])

;


