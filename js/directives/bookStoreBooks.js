/*global bookStore */
'use strict';

bookStore.directive("newbook", function(){
    return {
        restrict:"E",
        templateUrl : 'partials/newBook.html',
        transclude : true
    }
});
bookStore.directive("books", function(){
    return {
        restrict:"E",
        templateUrl : 'partials/books.html',
        transclude : true
    }
});

var INTEGER_REGEXP = /^\-?\d*$/;
bookStore.directive('integer', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                } else {
                    // it is invalid, return undefined (no model update)
                    ctrl.$setValidity('integer', false);
                    return undefined;
                }
            });
        }
    };
});

var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
bookStore.directive('float', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {

            ctrl.$parsers.unshift(function(viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
        }
    };
});