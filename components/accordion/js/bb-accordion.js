/**
 * Save current script path to load template
 * @type {string}
 */
var _bbAccordionDecorateCurrentScriptPath = (document.getElementsByTagName("script"))
    [(document.getElementsByTagName("script")).length - 1].src;


/**
  * BBAccordion decorator declaration
  * @constructor
  */
var Decorate = function($provide, $sceDelegateProvider) {

    var path = _bbAccordionDecorateCurrentScriptPath.substring(0, _bbAccordionDecorateCurrentScriptPath.lastIndexOf('/'));
    path = path.substring(0, path.lastIndexOf('/') + 1);

    var currentList = $sceDelegateProvider.resourceUrlWhitelist();
    currentList =  currentList ? currentList : ['self'];
    currentList.push(path + '**');
    $sceDelegateProvider.resourceUrlWhitelist(currentList);

    $provide.decorator('accordionGroupDirective', function($delegate) {
        var directive = $delegate[0];
        directive.templateUrl = path + 'bb-accordion.tpl.html';
        return $delegate;
    });
};


/**
  * Creation of 'bb.accordion' module
  */
angular.module('bb.accordion', ['ui.bootstrap']).config(['$provide', '$sceDelegateProvider', Decorate]);