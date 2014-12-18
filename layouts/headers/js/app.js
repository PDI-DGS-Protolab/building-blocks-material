/**
 * Created by developer on 12/12/14.
 */
var app = angular.module('bbApp', ['ngAnimate']);

app.controller('ShowController', ['$rootScope', '$scope',
    function($rootScope, $scope) {

        var switchTo = function(tabName) {
            $scope.selected = tabName;
        };

        var switchToWithToggle = function(tabName) {
            if ($scope.selected === tabName) {
                $scope.selected = '';
            } else {
                $scope.selected = tabName;
            }
        };

        var isSelected = function(tabName) {
            return $scope.selected == tabName;
        };

        var init = function(tabName) {
            $scope.selected = tabName;
        };

        $scope.selected = '';

        return {
            switchTo: switchTo,
            switchToWithToggle: switchToWithToggle,
            isSelected: isSelected,
            init: init
        };
    }
]);