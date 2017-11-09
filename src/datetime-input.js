'use strict';

/**
 * Datetime directive (date and time input element)
 */
angular.module('g1b.datetime-inputs', []).
directive('datetimeInput', ['$document', '$timeout', function ($document, $timeout) {
  return {
    restrict: 'E',
    scope: {
      datetime: '=',
      format: '=?',
      dateFormat: '=?',
      timeFormat: '=?',
      minDate:'=?',
      maxDate:'=?',
      hourStep:'=?',
      minuteStep:'=?',
      secondStep:'=?',
      onChange: '&',
      onClose: '&?',
      placeholder: '@',
      clearText: '@',
      cssClass:'@',
    },
    replace: true,
    templateUrl: './datetime-input.html',
    compile: function () {
      return {
        pre: function preLink() {},
        post: function postLink(scope, element) {

          // Get current date
          scope.current = moment();

          // Convert datetime object to moment.js if its not a moment object yet
          if ( scope.datetime && !scope.datetime._isAMomentObject ) {
            scope.datetime = moment(scope.datetime, scope.format);
          }

          // Toggle edit popover
          scope.toggleEditPopover = function () {
            if ( !!scope.selected ) {
              scope.selected = undefined;
            } else {
              scope.selected = scope.datetime || moment();
              scope.calendar = scope.selected.clone();
            }
          };

          // Update selected date
          scope.update = function (datetime, calendar_update) {
            if ( scope.selected.isSame(datetime) && !!scope.datetime ) { return; }
            if ( !datetime ) {
              scope.selected = scope.datetime = undefined;
            } else if ( ( !scope.minDate || datetime > scope.minDate ) && ( !scope.maxDate || datetime < scope.maxDate ) ) {
              scope.selected.year(datetime.year()).month(datetime.month()).date(datetime.date()).hours(datetime.hours()).minutes(datetime.minutes()).seconds(datetime.seconds());
              if ( (scope.selected.clone().startOf('week').month() !== scope.calendar.month() && scope.selected.clone().endOf('week').month() !== scope.calendar.month()) || calendar_update ) {
                scope.calendar = scope.selected.clone();
              }
              if ( !scope.datetime ) {
                scope.datetime = scope.selected;
              }
              scope.$$postDigest(function () {
                scope.onChange();
              });
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
            scope.calendarActive = false;

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
        }
      };
    }
  };
}]);
