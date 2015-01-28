
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
        return $resource(settings.backendAddress + 'books/:type:id', {}, {
            getBooks: {method: 'GET', headers: {'Content-Type': 'application/json'}, isArray: true},
            getBookById: {method: 'GET', params: {id: ''}},
            addBook: {method: 'POST', params: {id: ''}, isArray: false},
            editBook: {method: 'PUT', params: {id: ''}, isArray: false},
            deleteBook: {method: 'DELETE', params: {id: ''}, isArray: false}
        });
    }
])

.controller('BooksListCtrl', ['$scope', '$state', 'BooksService', '$modal',
    function($scope, $state, BooksService, $modal) {
        
        $scope.books = [];
        
        $scope.setColumns = function() {
            return [
                {field: 'author', displayName: 'Author'},
                {field: 'name', displayName: 'Name'},
                {field: 'description', displayName: 'Description'},
                {field: 'isRead', displayName: 'Is read?'}
            ];
        };
        
        $scope.gridOptions = {
            data: 'books',
            columnDefs: $scope.setColumns(),
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
            if (itemId.length > 0) {
                $state.go('books.details', {id: itemId[0]._id});
            }
        };
        
        $scope.editSelected = function(itemId) {
            if (itemId.length > 0) {
                $state.go('books.edit', {id: itemId[0]._id});
            }
        };
        
        $scope.deleteBook = function(itemId) {
            if (itemId.length === 0) {
                return;
            } else {
                var modalInstance = $modal.open({
                    templateUrl: "application/books/modal.confirmDelete.html",
                    controller: 'ConfirmDeleteModalCtrl'
                });
                modalInstance.result.then(function() {
                    BooksService.deleteBook({id: itemId[0]._id}, function(resp) {
                        $scope.books = $scope.getBooks();
                    });
                }, null);
            }
        };
        
        $scope.getBooks();
    }
])

.controller('BooksEditCtrl', ['$scope', '$state', '$stateParams', 'BooksService',
    function($scope, $state, $stateParams, BooksService) {
        
        $scope.readOnly = $state.current.name === 'books.details';
        $scope.newMode = $state.current.name === 'books.new';
        
        $scope.book = {};
        
        $scope.loadBook = function() {
            $scope.book = BooksService.getBookById({id: $stateParams.id});
        };
        
        $scope.saveNewBook = function() {
            BooksService.addBook({}, $scope.book, function(resp) {
                $scope.cancel();
            });
        };
        
        $scope.editBook = function() {
            BooksService.editBook({id: $stateParams.id}, $scope.book, function(resp) {
                $scope.cancel();
            });
        };
        
        $scope.cancel = function() {
            $state.go('books.list');
        };
        
        if(!$scope.newMode) {
            $scope.loadBook();
        }
        
    }
])

.controller('ConfirmDeleteModalCtrl', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {

        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
])


;
