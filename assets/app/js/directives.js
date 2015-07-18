'use strict';

/* Directives */

  
angular.module('myApp.directives', []).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      elm.bind('blur', function() {
        scope.$apply(function() {
		console.log(elm)
		
		update(elm);
          ctrl.$setViewValue(elm.html());
        });
      });
      ctrl.$render = function(value) {
        elm.html(value);
      };
 
      ctrl.$setViewValue(elm.html());
    }
  };
});