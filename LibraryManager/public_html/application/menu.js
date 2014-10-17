
angular.module('menu', [
    'ui.router',
])

controllers.controller('MenuCtrl', ['$scope', '$state', 
    function($scope, $state) {
        
        // change state and go to a new view
        $scope.navigateTo = function(navTo) {
            $scope.sections.forEach(function (item) {
                if(item.state === $scope.aciveItem) {
                    item.active = false;
                }
                if (item.state === navTo) {
                    item.active = true;
                }
            });
            $scope.aciveItem = navTo;
            $state.go(navTo, {init: true});
        };
        
    
        // menu sections shown in the left side
        $scope.sections = [
            {
                active: false,
                name : "Main",
                state : 'main'
            },
            {
                active: false,
                name : "Books",
                state : 'books'
            },
            {
                active: false,
                name : "PDF Collection",
                state : 'pdfCollection'
            },
            {
                active: false,
                name : "About",
                state : 'about'
            },
            
        ];
        
        
    } 
])
;