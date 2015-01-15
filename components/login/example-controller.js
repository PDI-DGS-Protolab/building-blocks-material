var app = angular.module('angularApp', ['ui.checkbox']);

/**
 * Definition of OptionsController
 * @constructor
 */
var OptionsController = function() {

    /**
      * Variable linked to the selected brand in the example
      * The default value is 'telefonica'
      */
    this.selectedBrand = 'telefonica';

    /**
      * Variable linked to the selected size in the example
      * The default value is 'medium'
      */
    this.selectedSize = 'medium';
};

LoginCtrl = function($rootScope, $scope) {
    this.keep = false;
    this.email = "";
    this.pass = "";
}

LoginCtrl.prototype.sendForm = function() {
    alert("User: " + this.email
            + "\nPass: " + this.pass
            + "\nKeep: " + this.keep
        );
    //send stuff here!
};

app.controller('LoginCtrl', ['$rootScope', '$scope', LoginCtrl]);
app.controller('OptionsCtrl', OptionsController);