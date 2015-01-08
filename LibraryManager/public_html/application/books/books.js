
angular.module('lm.books', [
    'ui.router',
    'ngResource',
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
                .state('books.details', {
                    url: '/detail/{id}',
                    views: {
                        '': {
                            templateUrl: 'application/books/books.html'
                        },
                        'detail@books': {
                            templateUrl: 'application/books/books.new.html',
                            controller: 'BooksEditCtrl'
                        }
                    }
                })
                .state('books.new', {
                    url: '/new',
                    views: {
                        '': {
                            templateUrl: 'application/books/books.html'
                        },
                        'new@books': {
                            templateUrl: 'application/books/books.new.html',
                            controller: 'BooksEditCtrl'
                        }
                    }
                })
                .state('books.edit', {
                    url: '/edit/{id}',
                    views: {
                        '': {
                            templateUrl: 'application/books/books.html'
                        },
                        'edit@books': {
                            templateUrl: 'application/books/books.new.html',
                            controller: 'BooksEditCtrl'
                        }
                    }
                });
            }
])

.factory('BooksService', ['$resource',
    function($resource) {
        return $resource('http://localhost:8080/api/books/:type:id', {}, {
            getBooks: {method: 'GET', headers: {'Content-Type': 'application/json'}, isArray: true},
            addBook: {method: 'POST', params: {id: ''}, isArray: false},
            editBook: {method: 'PUT', params: {id: ''}, isArray: false},
            deleteBook: {method: 'DELETE', params: {id: ''}, isArray: false}
        });
    }
])

.controller('BooksListCtrl', ['$scope', '$state', 'BooksService',
    function($scope, $state, BooksService) {
        
        $scope.books = [];
        $scope.cellTemplate = './cellTemplate.html';
        
        $scope.items = [
            {name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}
        ];
        
        $scope.gridOptions = {
            data: 'books',
            columnDefs: 
                    [
                        {field: 'author', displayName: 'Author'},
                        {field: 'name', displayName: 'Name'},
                        {field: 'description', displayName: 'Description'},
                        {field: 'isRead', displayName: 'Is read?'}
                    ],
            enableCellSelection: false,
            enableRowSelection: true,
            useExternalSorting: true,
            enablePaging: true,
            multiSelect: false,
            selectedItems: []
        };

        $scope.getBooks = function() {
            BooksService.getBooks({}, function(resp) {
                $scope.books = resp;
            });
        };
        
        $scope.add = function() {
            $state.go('books.new');
        };
        
        $scope.showDetails = function(itemId) {
            $state.go('books.details', {id: itemId[0]._id});
        };
        
        $scope.editSelected = function(itemId) {
            $state.go('books.edit', {id: itemId[0]._id});
        };
        
        $scope.deleteSelected = function(itemId) {
            // TODO delete 
        };
        
        $scope.getBooks();
    }
])

.controller('BooksEditCtrl', ['$scope', '$state', '$stateParams', 'BooksService',
    function($scope, $state, $stateParams, BooksService) {
        
        $scope.readOnly = $state.current.name === 'books.details';
        $scope.newMode = $state.current.name === 'books.new';
        
        $scope.saveNewBook = function() {
            var i = 5;
            BooksService.addBook({}, $scope.book, function(resp) {
                var i = 5;
//                $scope.cancel();
            });
        };
        
        $scope.cancel = function() {
            $state.go('books.list');
        };
        
        
    }
])
;
