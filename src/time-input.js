'use strict';

/**
 * Time directive (time input element)
 */
angular.module('g1b.datetime-input').
directive('timeInput', ['$document', function ($document) {
  return {
    restrict: 'E',
    scope: {
      time: '=',
      onChange: '&'
    },
    replace: true,
    templateUrl: './time-input.html',
    compile: function () {
      return {
        pre: function preLink() {},
        post: function postLink(scope, element) {

          // Convert time object to moment.js if its not a moment object yet
          if ( scope.time && !scope.time._isAMomentObject ) {
            scope.time = moment(scope.time);
          }

          // Bind click events outside directive to close edit popover
          $document.on('mousedown', function (e) {
            if ( !!scope.selected && !element[0].contains(e.target) ) {
              scope.$apply(function () {
                scope.selected = '';
                scope.calendar_active = false;
              });
            }
          });
        }
      };
    }
  };
}]);
