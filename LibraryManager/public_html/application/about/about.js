
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

.controller('AboutInfoCtrl', ['$scope', '$state', '$sce',
    function($scope, $state, $sce) {
        
        $scope.description = "MEAN - The Friendly & Fun Javascript Fullstack for your next web application";
     
        $scope.technologies = 
        [
            {
                name: "MongoDB",
                logo: "http://mean.io/system/assets/img/logos/mongodb.png",
                description: "MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable."
            },
            {
                name: "Express.js",
                logo: "http://mean.io/system/assets/img/logos/express.png",
                description: "Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications."
            },
            {
                name: "AngularJS",
                logo: "http://mean.io/system/assets/img/logos/angularjs.png ",
                description: "AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop."
            },
            {
                name: "NodeJS",
                logo: "http://mean.io/system/assets/img/logos/nodejs.png",
                description: "Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications."
            }
        ];
        
        
        
    }  
])

;

