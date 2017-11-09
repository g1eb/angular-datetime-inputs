'use strict';

/**
 * Time directive (time input element)
 */
angular.module('g1b.datetime-inputs').
directive('timeInput', ['$document', '$timeout', function ($document, $timeout) {
  return {
    restrict: 'E',
    scope: {
      time: '=',
      format: '=?',
      timeFormat: '=?',
      minDate:'=?',
      maxDate:'=?',
      hourStep : '=?',
      minuteStep : '=?',
      secondStep : '=?',
      allowClear:'=?',
      onChange: '&',
      onClose: '&?',
      placeholder: '@',
      clearText: '@',
      cssClass:'@',
    },
    replace: true,
    templateUrl: './time-input.html',
    compile: function () {
      return {
        pre: function preLink() {},
        post: function postLink(scope, element) {

          // Convert time object to moment.js if its not a moment object yet
          if ( scope.time && !scope.time._isAMomentObject ) {
            scope.time = moment(scope.time, scope.format);
          }

          // Toggle edit popover
          scope.toggleEditPopover = function () {
            if ( !!scope.selected ) {
              scope.selected = undefined;
            } else {
              scope.selected = scope.time || moment();
            }
          };

          // Update selected time
          scope.update = function (datetime, calendar_update) {
            if ( scope.selected.isSame(datetime) && !!scope.time ) { return; }
            if ( !datetime ) {
              scope.selected = scope.time = undefined;
            } else if ( ( !scope.minDate || datetime > scope.minDate ) && ( !scope.maxDate || datetime < scope.maxDate ) ) {
              scope.selected.year(datetime.year()).month(datetime.month()).date(datetime.date()).hours(datetime.hours()).minutes(datetime.minutes()).seconds(datetime.seconds());
              if ( !scope.time ) {
                scope.time = scope.selected;
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
