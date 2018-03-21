'use strict';

/**
 * Date directive (date input element)
 */
angular.module('g1b.datetime-inputs').
directive('dateInput', ['$document', '$timeout', function ($document, $timeout) {
  return {
    restrict: 'E',
    scope: {
      date: '=',
      format: '=?',
      dateFormat: '=?',
      minDate:'=?',
      maxDate:'=?',
      allowClear:'=?',
      onChange: '&',
      onClose: '&?',
      placeholder: '@',
      clearText: '@',
      closeText: '@',
      cssClass:'@',
    },
    replace: true,
    templateUrl: './date-input.html',
    compile: function () {
      return {
        pre: function preLink() {},
        post: function postLink(scope, element) {

          // Get current date
          scope.current = moment();

          // Convert date object to moment.js if its not a moment object yet
          if ( scope.date && !scope.date._isAMomentObject ) {
            scope.date = moment(scope.date, scope.format);
          }

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
            } else if ( ( !scope.minDate || datetime > scope.minDate ) && ( !scope.maxDate || datetime < scope.maxDate ) ) {
              scope.selected.year(datetime.year()).month(datetime.month()).date(datetime.date()).hours(datetime.hours()).minutes(datetime.minutes()).seconds(datetime.seconds());
              if ( scope.selected.clone().startOf('week').month() !== scope.calendar.month() || calendar_update ) {
                scope.calendar = scope.selected.clone();
              }
              if ( !scope.date ) {
                scope.date = scope.selected;
              }
              scope.$$postDigest(function () {
                scope.onChange();
              });
              scope.close();
            } else {
              scope.warning = true;
              $timeout(function () {
                scope.warning = false;
              }, 250);
            }
          };

          // Close edit popover
          scope.close = function () {
            scope.selected = '';

            if ( !!scope.onClose ) {
              scope.onClose();
            }
          }

          // Bind click events outside directive to close edit popover
          $document.on('mousedown', function (e) {
            if ( !!scope.selected && !element[0].contains(e.target) ) {
              scope.$apply(function () {
                scope.close();
              });
            }
          });

          // Bind 'esc' keyup event to close edit popover
          $document.on('keyup', function (e) {
            if ( !!scope.selected && e.keyCode === 27) {
              scope.$apply(function () {
                scope.close();
              });
            }
          });
        }
      };
    }
  };
}]);
