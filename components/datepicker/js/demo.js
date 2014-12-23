var app = angular.module('angularApp', ['ui.bootstrap'])
    .config(function(datepickerConfig) { //Configures datePicker
        datepickerConfig.showWeeks = true;
        datepickerConfig.yearRange = 12;
        datepickerConfig.formatDayTitle = "MMMM d'th', yyyy";
        datepickerConfig.rowsYearNumber = 3;
        datepickerConfig.formatYearTitle = "yyyy";
        datepickerConfig.maxDate = "2017-06-22"; //Random max date
    });

var DatepickerDemoCtrl = function() {
    this.today();
    this.opened = false;
};
DatepickerDemoCtrl.prototype.today = function() {
    this.dt = new Date();
};

DatepickerDemoCtrl.prototype.clear = function() {
    this.dt = null;
};

DatepickerDemoCtrl.prototype.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.opened = true;
    setTimeout(function(){ $event.target.focus(); }, 10);
};

var load_template = function(template, url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    var jsCode = request.responseText;

    app.run(function($templateCache) {
        $templateCache.put(template, jsCode);
    });
};

templates = [{
    'url': 'templ/day.html',
    'directive': 'template/datepicker/day.html'
}, {
    'url': 'templ/month.html',
    'directive': 'template/datepicker/month.html'
}, {
    'url': 'templ/year.html',
    'directive': 'template/datepicker/year.html'
}, {
    'url': 'templ/popup.html',
    'directive': 'template/datepicker/popup.html'
}, {
    'url': 'templ/datepicker.html',
    'directive': 'template/datepicker/datepicker.html'
}];
templates.forEach(function(obj) {
    load_template(obj.directive, obj.url);
});

app.controller('DatepickerDemoCtrl', ['$scope', DatepickerDemoCtrl]);


/*
 var app = angular.module('angularApp', ['ui.bootstrap']);

 var OptionsController = function() {
 this.selectedBrand = 'telefonica';
 this.selectedSize = 'medium';
 this.baseurl = 'https://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/table';
 };

 app.controller('OptionsController', OptionsController); 
 
 var DatepickerDemoCtrl = function ($scope) {
 this.dateOptions = {
 formatYear: 'yyyy',
 startingDay: 1
 };

 $scope.today = function() {
 $scope.dt = new Date();
 };
 $scope.today();
 $scope.opened = false;
 this.mode = 'day';

 $scope.changeMode = function(mode){
 this.mode = mode;
 };

 $scope.clear = function () {
 $scope.dt = null;
 };

 $scope.disabled = function(date, mode) {
 return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
 };

 $scope.open = function($event) {
 $scope.opened = true;
 setTimeout(function(){ document.getElementById("test").focus(); }, 10);
 };

 $scope.toggleMin = function() {
 this.minDate = this.minDate ? null : new Date();
 };
 
 this.selectedBrand="telefonica";

 };

 load_template = function(template, url){
 var request = new XMLHttpRequest();
 request.open("GET", url, false);
 request.send(null);
 var jsCode = request.responseText;

 app.run(function($templateCache) {
 $templateCache.put(template, jsCode);
 });
 }
 var cdnUrl = "http://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/datepicker/";
 templates = [{'url' : cdnUrl+'templ/day.html', 'directive' : 'template/datepicker/day.html'},
 {'url' :  cdnUrl+'templ/month.html', 'directive' : 'template/datepicker/month.html'},
 {'url' :  cdnUrl+'templ/year.html', 'directive' : 'template/datepicker/year.html'},
 {'url' :  cdnUrl+'templ/popup.html', 'directive' : 'template/datepicker/popup.html'},
 {'url' :  cdnUrl+'templ/datepicker.html', 'directive' : 'template/datepicker/datepicker.html'}];

 templates.forEach(function(obj){
 load_template(obj.directive, obj.url);
 });

 app.controller('DatepickerDemoCtrl', ['$scope', DatepickerDemoCtrl])
 */
