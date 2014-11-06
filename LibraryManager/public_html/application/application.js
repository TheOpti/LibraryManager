'use strict';

var controllers = angular.module('controllers', []);

var libraryManager = angular.module('libraryManager', [
    'ui.router',
    
    'controllers',
    
    'lm.books',
    'lm.pdfCollection',
    'lm.about',
    'lm.main'
    
]);