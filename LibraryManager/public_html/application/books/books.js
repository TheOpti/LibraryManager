
angular.module('lm.books', [
    'ui.router',
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
                    url: '/books/list/{init}',
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
                            templateUrl: 'application/books/books.edit.html',
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
                            controller: 'BooksNewCtrl'
                        }
                    }
                })
                .state('books.edit', {
                    url: '/edit/{id}',
                    views: {
                        '': {
                            templateUrl: 'application/books/books.html'
                        },
                        'edit@books ': {
                            templateUrl: 'application/books/books.edit.html',
                            controller: 'BooksEditCtrl'
                        }
                    }
                });
            }
])

.controller('BooksListCtrl', ['$scope', '$state',
    function($scope, $state) {
        
        var i = 2;
        i = 3;
        
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
