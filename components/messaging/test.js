var app = angular.module('myApp', ['angular-msg']);

app.config(['msgProvider', function (msgProvider) {
  msgProvider.globalTimeToLive(3*1000);  // Time to live (In milisecs)
  // msgProvider.globalTimeToLive({success:1000,error:3000});  // Time to live but single one
  msgProvider.onlyUniqueMessages(true);
}]);

app.controller('demoCtrl',
               ['$scope', 'msg',function($scope, msg) {
                 $scope.basicUsage = function (type) {
                   var config = {};
                   switch (type) {
                   case "success":
                     msg.success("I'm a success message", {title:"No problems at all!", ttl:-1});
                     break;
                   case "danger": 
                     msg.error("Ups, error message here!", {title:"There's a problem"});
                   }
                 };
               }]);

