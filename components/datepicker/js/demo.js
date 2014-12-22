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

// templates = [{
//     'url': 'templ/day.html',
//     'directive': 'template/datepicker/day.html'
// }, {
//     'url': 'templ/month.html',
//     'directive': 'template/datepicker/month.html'
// }, {
//     'url': 'templ/year.html',
//     'directive': 'template/datepicker/year.html'
// }, {
//     'url': 'templ/popup.html',
//     'directive': 'template/datepicker/popup.html'
// }, {
//     'url': 'templ/datepicker.html',
//     'directive': 'template/datepicker/datepicker.html'
// }];
templates = [{
  'url': 'http://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/datepicker/templ/day.html',
  'directive': 'template/datepicker/day.html'
}, {
  'url': 'http://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/datepicker/templ/month.html',
  'directive': 'template/datepicker/month.html'
}, {
  'url': 'http://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/datepicker/templ/year.html',
  'directive': 'template/datepicker/year.html'
}, {
  'url': 'http://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/datepicker/templ/popup.html',
  'directive': 'template/datepicker/popup.html'
}, {
  'url': 'http://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/datepicker/templ/datepicker.html',
  'directive': 'template/datepicker/datepicker.html'
}];
templates.forEach(function(obj) {
    load_template(obj.directive, obj.url);
});

app.controller('DatepickerDemoCtrl', ['$scope', DatepickerDemoCtrl]);

