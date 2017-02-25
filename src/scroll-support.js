// Scroll up directive
angular.module('g1b.datetime-inputs').
  directive('scrollUp', function () {
  return {
    restrict: 'A',
    compile: function () {
      return {
        pre: function preLink() {},
        post: function postLink(scope, element, attrs) {
          element.bind('mousewheel wheel', function (ev) {
            ev = ev.originalEvent || ev;
            var delta = ev.wheelDelta || (-1 * ev.deltaY) || 0;
            if ( delta > 0 ) {
              scope.$apply(function () {
                scope.$eval(attrs.scrollUp);
              });
              ev.preventDefault();
            }
          });
        }
      };
    }
  };
});

// Scroll down directive
angular.module('g1b.datetime-inputs').
  directive('scrollDown', function () {
  return {
    restrict: 'A',
    compile: function () {
      return {
        pre: function preLink() {},
        post: function postLink(scope, element, attrs) {
          element.bind('mousewheel wheel', function (ev) {
            ev = ev.originalEvent || ev;
            var delta = ev.wheelDelta || (-1 * ev.deltaY) || 0;
            if ( delta < 0 ) {
              scope.$apply(function () {
                scope.$eval(attrs.scrollDown);
              });
              ev.preventDefault();
            }
          });
        }
      };
    }
  };
});
