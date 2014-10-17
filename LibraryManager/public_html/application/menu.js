
angular.module('menu', [
    'ui.router',
])

controllers.controller('MainMenuCtrl', ['$scope', '$state', 
    function($scope, $state) {
        
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
                state : 'main'
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
        
        
    } 
])
;