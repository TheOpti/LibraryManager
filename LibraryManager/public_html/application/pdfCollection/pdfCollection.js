
angular.module('lm.pdfCollection', [
    'ui.router',
])

.config(
    ['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('pdfCollection', {
                    abstract: true,
                    url: '/pdfCollection',
                    templateUrl: 'application/pdfCollection/pdfCollection.html'
                })
                .state('pdfCollection.list', {
                    url: '/list/',
                    views: {
                        '': {
                            templateUrl: 'application/pdfCollection/pdfCollection.html'
                        },
                        'list@pdfCollection': {
                            templateUrl: 'application/pdfCollection/pdfCollection.list.html',
                            controller: 'PdfCollectionListCtrl'
                        }
                    }
                })
//                .state('pdfCollection.details', {
//                    url: '/detail/{id}',
//                    views: {
//                        '': {
//                            templateUrl: 'application/pdfCollection/pdfCollection.html'
//                        },
//                        'detail@pdfCollection': {
//                            templateUrl: 'application/pdfCollection/pdfCollection.edit.html',
//                            controller: 'BooksEditCtrl'
//                        }
//                    }
//                })
//                .state('pdfCollection.new', {
//                    url: '/new',
//                    views: {
//                        '': {
//                            templateUrl: 'application/pdfCollection/pdfCollection.html'
//                        },
//                        'new@pdfCollection': {
//                            templateUrl: 'application/pdfCollection/pdfCollection.new.html',
//                            controller: 'BooksNewCtrl'
//                        }
//                    }
//                })
//                .state('pdfCollection.edit', {
//                    url: '/edit/{id}',
//                    views: {
//                        '': {
//                            templateUrl: 'application/pdfCollection/pdfCollection.html'
//                        },
//                        'edit@pdfCollection ': {
//                            templateUrl: 'application/pdfCollection/pdfCollection.edit.html',
//                            controller: 'BooksEditCtrl'
//                        }
//                    }
//                });
            }
])

.controller('PdfCollectionListCtrl', ['$scope', '$state',
    function($scope, $state) {
        
        var i = 2;
        i = 3;
        
    }
])

.controller('PdfCollectionEditCtrl', ['$scope', '$state',
    function($scope, $state) {
        
    }
])

.controller('PdfCollectionNewCtrl', ['$scope', '$state',
    function($scope, $state) {
        
    }
])
;
