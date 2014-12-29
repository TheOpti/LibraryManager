
angular.module('lm.books', [
    'ui.router',
    'ngGrid'
])

.config(
    ['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('books', {
                    abstract: true,
                    url: '/books',
                    templateUrl: 'application/books/books.html'
                })
                .state('books.list', {
                    url: '/books/list',
                    views: {
                        '': {
                            templateUrl: 'application/books/books.html'
                        },
                        'list@books': {
                            templateUrl: 'application/books/books.list.html',
                            controller: 'BooksListCtrl'
                        }
                    }
                })
//                .state('books.details', {
//                    url: '/detail/{id}',
//                    views: {
//                        '': {
//                            templateUrl: 'application/books/books.html'
//                        },
//                        'detail@books': {
//                            templateUrl: 'application/books/books.edit.html',
//                            controller: 'BooksEditCtrl'
//                        }
//                    }
//                })
//                .state('books.new', {
//                    url: '/new',
//                    views: {
//                        '': {
//                            templateUrl: 'application/books/books.html'
//                        },
//                        'new@books': {
//                            templateUrl: 'application/books/books.new.html',
//                            controller: 'BooksNewCtrl'
//                        }
//                    }
//                })
//                .state('books.edit', {
//                    url: '/edit/{id}',
//                    views: {
//                        '': {
//                            templateUrl: 'application/books/books.html'
//                        },
//                        'edit@books ': {
//                            templateUrl: 'application/books/books.edit.html',
//                            controller: 'BooksEditCtrl'
//                        }
//                    }
//                });
            }
])

.controller('BooksListCtrl', ['$scope', '$state',
    function($scope, $state) {
        
        $scope.items = [
            {name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}
        ];
        
        $scope.gridOptions = {
            data: 'items',
            columnDefs: [],
            enableCellSelection: true,
            enableRowSelection: true,
            headerRowTemplate: $scope.headerRow,
            useExternalSorting: true,
            enablePaging: true,
            sortInfo: $scope.sortInfo,
            customKeys: $scope.customKeys,
            multiSelect: false,
            selectedItems: []
        };

        $scope.setGridColumns = function() {
            var columnDefs = [
              {field: 'name', displayName: 'Username'},
              {field: 'age', displayName: 'User age'}
            ];
            $scope.gridOptions.columnDefs = columnDefs;
        };
        
        $scope.setGridColumns();
        
    }
])

.controller('BooksEditCtrl', ['$scope', '$state',
    function($scope, $state) {
        
    }
])

.controller('BooksNewCtrl', ['$scope', '$state',
    function($scope, $state) {
        
    }
])
;
