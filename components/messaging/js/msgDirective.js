angular.module("angular-msg").directive("msg", [
  function () {
    "use strict";

    return {
      restrict: 'A',
      templateUrl: 'templates/msg/msg.html',
      replace: false,
      scope: {
        reference: '@',
        inline: '=',
        limitMessages: '='
      },
      controller: ['$scope', '$timeout', 'msg', 'msgMessages',
                   function ($scope, $timeout, msg, msgMessages) {
                     $scope.referenceId = $scope.reference || 0;

                     msgMessages.initDirective($scope.referenceId, $scope.limitMessages);
                     $scope.msgMessages = msgMessages;
                     $scope.inlineMessage = angular.isDefined($scope.inline) ? $scope.inline : msg.inlineMessages();

                     $scope.$watch('limitMessages', function (limitMessages) {
                       var directive = msgMessages.directives[$scope.referenceId];
                       if (!angular.isUndefined(limitMessages) && !angular.isUndefined(directive)) {
                         directive.limitMessages = limitMessages;
                       }
                     });

                     //Cancels all promises within message upon deleting message or stop deleting.
                     $scope.stopTimeoutClose = function (message) {
                       if (!message.clickToClose) {
                         angular.forEach(message.promises, function (promise) {
                           $timeout.cancel(promise);
                         });
                         if (message.close) {
                           msgMessages.deleteMessage(message);
                         } else {
                           message.close = true;
                         }
                       }
                     };

                     $scope.alertClasses = function (message) {
                       return {
                         'msg-success' : message.severity === "success",
                         'msg-error' : message.severity === "error",
                         // 'alert-success': message.severity === "success",
                         // 'alert-error': message.severity === "error", //bootstrap 2.3
                         // 'alert-danger': message.severity === "error", //bootstrap 3
                         // 'alert-info': message.severity === "info",
                         // 'alert-warning': message.severity === "warning", //bootstrap 3, no effect in bs 2.3
                         'icon': message.disableIcons === false,
                         'alert-dismissable': !message.disableCloseButton
                       };
                     };

                     $scope.showCountDown = function (message) {
                       return !message.disableCountDown && message.ttl > 0;
                     };

                     $scope.wrapperClasses = function () {
                       var classes = {};
                       classes['msg-fixed'] = !$scope.inlineMessage;
                       classes[msg.position()] = true;
                       return classes;
                     };

                     $scope.computeTitle = function (message) {
                       var ret = {
                         'success': 'Success',
                         'error': 'Error',
                         'info': 'Information',
                         'warn': 'Warning'
                       };
                       return ret[message.severity];
                     };
                   }
                  ]
    };
  }
]);

angular.module("angular-msg").run(['$templateCache', function ($templateCache) {
  "use strict";
  if ($templateCache.get('templates/msg/msg.html') === undefined) {
    $templateCache.put("templates/msg/msg.html",
                       '<div class="msg-container" ng-class="wrapperClasses()">' +
                       '<div class="msg-item msg" ng-repeat="message in msgMessages.directives[referenceId].messages" ng-class="alertClasses(message)" ng-click="msgMessages.deleteMessage(message)">' +
                       '<div class="msg-icon"></div>' +
                       '<div class="msg-content">' +
                       //'<h4 class="msg-title" ng-show="message.title" ng-bind="message.title"></h4>' +
                       '<div class="msg-title" ng-show="message.title" ng-bind="message.title"></div>' +
                       '<div class="msg-message" ng-bind-html="message.text"></div>' +
                       '</div>' +
                       '</div>' +
                       '</div>'
                      );
  }
}]);

// angular.module("angular-msg").run(['$templateCache', function ($templateCache) {
//   "use strict";
//   if ($templateCache.get('templates/msg/msg.html') === undefined) {
//     $templateCache.put("templates/msg/msg.html",
//                        '<div class="msg-container" ng-class="wrapperClasses()">' +
//                        '<div class="msg-item alert" ng-repeat="message in msgMessages.directives[referenceId].messages" ng-class="alertClasses(message)" ng-click="stopTimeoutClose(message)">' +
//                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true" ng-click="msgMessages.deleteMessage(message)" ng-show="!message.disableCloseButton">&times;</button>' +
//                        '<button type="button" class="close" aria-hidden="true" ng-show="showCountDown(message)">{{message.countdown}}</button>' +
//                        '<h4 class="msg-title" ng-show="message.title" ng-bind="message.title"></h4>' +
//                        '<div class="msg-message" ng-bind-html="message.text"></div>' +
//                        '</div>' +
//                        '</div>'
//                       );
//   }
// }]);
