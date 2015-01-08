var controllers = angular.module('controllers', []);

var libraryManager = angular.module('libraryManager', [
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.collapse',
    'ui.bootstrap.popover',
    
    'controllers',
    
    'lm.books',
    'lm.pdfCollection',
    'lm.about',
    'lm.main'
    
]);