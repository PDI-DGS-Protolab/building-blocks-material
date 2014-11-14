/**
  * BBAccordion decorator declaration
  * @constructor
  */
var Decorate = function($provide) {
    $provide.decorator('accordionGroupDirective', function($delegate) {
        var directive = $delegate[0];
        directive.templateUrl = "../bb-accordion.tpl.html";
        return $delegate;
    });
};


/**
  * Creation of 'bb.accordion' module
  */
angular.module('bb.accordion', ['ui.bootstrap']).config(['$provide', Decorate]);