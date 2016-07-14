'use strict';

/**
 * Date directive (date input element)
 */
angular.module('g1b.datetime-input', []).
directive('dateInput', ['$document', function ($document) {
  return {
    restrict: 'E',
    scope: {
      date: '=',
      handler: '&'
    },
    replace: true,
    templateUrl: './date-input.html',
    compile: function () {
      return {
        pre: function preLink() {},
        post: function postLink(scope, element) {

          // Get current date
          scope.current = moment();

          // Set selected date
          scope.selectDate = function (date) {
            if ( scope.selected === date ) {
              scope.selected = undefined;
            } else {
              scope.selected = date;
              scope.calendar = scope.selected.clone();
            }
          };

          // Update selected date
          scope.setDate = function (date, calendar_update) {
            if ( scope.selected.isSame(date) ) { return; }
            scope.selected.year(date.year()).month(date.month()).date(date.date()).hours(date.hours()).minutes(date.minutes()).seconds(date.seconds());
            if ( scope.selected.clone().startOf('week').month() !== scope.calendar.month() || calendar_update ) {
              scope.calendar = scope.selected.clone();
            }
            scope.handler();
          };

          // Convert date object to moment.js if its not a moment object yet
          if ( scope.date && !scope.date._isAMomentObject ) {
            scope.date = moment(scope.date);
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
