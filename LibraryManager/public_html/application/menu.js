
angular.module('menu', [
    'ui.router',
])

.controller('MainMenuCtrl', ['$scope', '$state', '$rootScope', 
    function($scope, $state, $rootScope) {
        
        $scope.activeItem = '';
        
        // change state and go to a new view
        $scope.navigateTo = function(navTo) {
            $scope.sections.forEach(function (section) {
                if(section.state === $scope.activeItem) {
                    section.active = false;
                }
                if (section.state === navTo) {
                    section.active = true;
                }
            });
            $scope.activeItem = navTo;
            $state.go(navTo, {init: true});
        };
        
    
        // menu sections shown in the left side
        $scope.sections = [
            {
                active: false,
                name : "Main",
                state : 'main.info'
            },
            {
                active: false,
                name : "Books",
                state : 'books.list'
            },
            {
                active: false,
                name : "PDF Collection",
                state : 'pdfCollection.list'
            },
            {
                active: false,
                name : "About",
                state : 'about.info'
            },    
        ];
        
        $scope.swithSelection = function(stateName) {
            $scope.sections.forEach(function (item) {
                if (item.state === stateName || item.state.split(".")[0] === stateName.split(".")[0]) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
        };
        
        $scope.$on('$stateChangeStart', function(event, to, params) {
            $rootScope.$currentState = to.name;
            $scope.swithSelection(to.name);
        });
        
        
    } 
])
;