
angular.module('lm.pdfCollection', [
    'ui.router',
    'ngGrid',
    'base64',
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

.factory('PdfFilesService', ['$resource',
    function($resource) {
        return $resource('http://localhost:8080/api/pdf/:filename', {}, {
            getListOfPDF: {method: 'GET', headers: {'Content-Type': 'application/json'}, isArray: true},
        });
    }
])

.controller('PdfCollectionListCtrl', ['$scope', '$state', 'PdfFilesService', '$base64',
    function($scope, $state, PdfFilesService, $base64) {
        
        $scope.listOfPDF = [];
        
        $scope.setColumns = function() {
            return [
                {field: 'name', displayName: 'Title'},
                {field: 'extension', displayName: 'Extension', width: '10%'},
            ];
        };
        
        $scope.gridOptions = {
            data: 'listOfPDF',
            columnDefs: $scope.setColumns(),
            enableCellSelection: false,
            enableRowSelection: true,
            useExternalSorting: true,
            enablePaging: true,
            multiSelect: false,
            selectedItems: []
        };
        
        $scope.getListOfPDFs = function() {
            PdfFilesService.getListOfPDF({}, function(resp) {
                $scope.listOfPDF = resp;
                resp.forEach(function(item) {
                    var newLink = $("<a />", {
                        id : item.name,
                        name : "link",
                        href : 'http://localhost:8080/api/pdf/' + item.name + '.' + item.extension,
                        text : item.name,
                        hidden : true
                    });
                    
                    $("#collection").append(newLink);
                });
            });
        };
        
        $scope.downloadSelected = function(filename) {
            document.getElementById(filename[0].name).click();
        };
        
        $scope.upload = function() {
            
        };
        
        $scope.getListOfPDFs();
        
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
