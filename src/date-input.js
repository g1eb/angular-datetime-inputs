'use strict';

/**
 * Date directive (date input element)
 */
angular.module('g1b.datetime-inputs').
directive('dateInput', ['$document', function ($document) {
  return {
    restrict: 'E',
    scope: {
      date: '=',
      onChange: '&',
      placeholder: '@'
    },
    replace: true,
    templateUrl: './date-input.html',
    compile: function () {
      return {
        pre: function preLink() {},
        post: function postLink(scope, element) {

          // Get current date
          scope.current = moment();

          // Toggle edit popover
          scope.toggleEditPopover = function () {
            if ( !!scope.selected ) {
              scope.selected = undefined;
            } else {
              scope.selected = scope.date || moment();
              scope.calendar = scope.selected.clone();
            }
          };

          // Update selected date
          scope.update = function (datetime, calendar_update) {
            if ( scope.selected.isSame(datetime) && !!scope.date ) { return; }
            if ( !datetime ) {
              scope.selected = scope.date = undefined;
            } else {
              scope.selected.year(datetime.year()).month(datetime.month()).date(datetime.date()).hours(datetime.hours()).minutes(datetime.minutes()).seconds(datetime.seconds());
              if ( scope.selected.clone().startOf('week').month() !== scope.calendar.month() || calendar_update ) {
                scope.calendar = scope.selected.clone();
              }
            }
            if ( !scope.date ) {
              scope.date = scope.selected;
            }
            scope.$$postDigest(function () {
              scope.onChange();
            });
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
