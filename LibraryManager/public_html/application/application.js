//var controllers = angular.module('controllers', []);

var libraryManager = angular.module('libraryManager', [
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.collapse',
    'ui.bootstrap.popover',
    
    'menu',
    
    'lm.books',
    'lm.pdfCollection',
    'lm.about',
    'lm.main'
    
]);