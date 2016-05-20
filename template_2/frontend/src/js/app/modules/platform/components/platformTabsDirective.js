
(function(angular) {
  'use strict';

  angular.module('platformModule')

    .value('platformTabNames', {
      windows:    'Windows',
      osx:        'MAC OS',
      android:    'ANDROID',
      ios:        'iOS'
    })

    .directive('platformTabs', function() {
      return {
        restrict: 'EA',
        replace: true,
        transclude: true,

        scope: {
          ngModel: '=?'
        },

        templateUrl: SaaS.location + '/docroot/assets/partials/platform-tabs.html',

        controller: function($scope, $element, platformService) {
          var panes = $scope.panes = [];

          $scope.select = function(pane) {
            angular.forEach(panes, function(pane) {
              pane.selected = false;
            });
            pane.selected = true;
            console.dir(pane);
            $scope.ngModel = pane.platform;
          };

          this.addPane = function(pane) {
            console.log('add pane: platform=%s, name="%s"', pane.platform, pane.name);
            if (panes.length === 0 || pane.platform === platformService.os.id) {
              $scope.select(pane);
            }
            panes.push(pane);
          };
        }
      };
    })

    .directive('platformTab', ['platformTabNames', function(platformTabNames) {
      return {
        restrict: 'EA',
        require: '^platformTabs',
        replace: true,
        transclude: true,

        scope: {
          platform: '@'
        },

        template: '<div id="{{id}}" class="platform-tab" ng-show="selected" ng-transclude></div>',

        link: function(scope, element, attrs, platformTabsController) {
          if (platformTabNames[scope.platform]) {
            scope.name = platformTabNames[scope.platform];

            platformTabsController.addPane(scope);
          }
        }
      };
    }]);

})(angular);
