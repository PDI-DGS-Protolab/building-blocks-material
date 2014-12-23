var table = angular.module('table', ['ngTable', 'ngResource', 'DemoMock']);

var tableExampleController = function($scope, $timeout, $resource, ngTableParams) {
    var self = this, scope = $scope.$new();

    var parentThis = this;
    
    // Ajax API
    this.Api = $resource('/data', null, {
      'update': {method:'PUT'},
      'post': {method:'POST'}
    });
    
    this.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 24,          // count per page
        sorting: {
            name: 'asc'     // initial sorting
        }
    }, {
        total: 0,
        getData: function($defer, params){
            parentThis.Api.get(params.url(), function(data){
                $timeout(function(){
                    params.total(data.total);
                    params.npages = Math.ceil(data.total / params.count());
                    $defer.resolve(data.result);
                    parentThis.data = data.result;
                    parentThis.columns = data.columns;
                    parentThis.options = data.options;
                }, 500);
            });
        }
    });    
};

// This functions are needed by the table component.

tableExampleController.prototype.putData = function(data){
    this.Api.update('', data);
};

tableExampleController.prototype.deleteData = function(data){
    this.Api.post('', data);
};
tableExampleController.prototype.finish_edit = function(dataitem){
    dataitem.$edit = false;
    // Here you can search and check that is not modified
    this.putData(dataitem);
};

tableExampleController.prototype.dynamic_click = function(option){
    var func = this[option.click];
    func();
};

tableExampleController.prototype.clear = function(actual_option){
    for (var option in this.options){
        if (actual_option != this.options[option]){
            this.options[option].shown = false;
        }
    }
};

tableExampleController.prototype.select_item = function(dataitem, data){
    if (!dataitem.$edit){
        dataitem.$selected = !dataitem.$selected;
    }
};
tableExampleController.prototype.itemsSelected = function(){
    return (this.data) ? this.data.some(function(a,b,c){
        return a.$selected;
    }) : false;
};



// Next functions are the actions when "click" an option in the footer
//You should add yours


tableExampleController.prototype.get_selected = function(){
    var sel = this.data.filter(function(e,i,a){
        return (e.$selected);
    });
    return sel;
};

tableExampleController.prototype.remove_selected = function(){
    var selected = get_selected();
    for (var key in selected) {
        // "Good enough" for most cases
        if (String(parseInt(key, 10)) === key && selected.hasOwnProperty(key)) {
            index = this.data.indexOf(selected[key]);
            if (index > -1) {
                this.data.splice(index, 1);
            }
        }
    };
    this.deleteData(selected);
};

tableExampleController.prototype.clear_selected = function(){
    var selected = get_selected();
    for (var key in selected) {
        // "Good enough" for most cases
        if (String(parseInt(key, 10)) === key && selected.hasOwnProperty(key)) {
            var index = this.data.indexOf(selected[key]);
            if (index > -1) {
                if (! this.data[index].$edit)
                    this.data[index].$selected = false;
            }
        }
    };
};

tableExampleController.prototype.edit_selected = function(){
    var selected = get_selected();
    for (var key in selected) {
        // "Good enough" for most cases
        if (String(parseInt(key, 10)) === key && selected.hasOwnProperty(key)) {
            index = this.data.indexOf(selected[key]);
            if (index > -1) {
                if(this.data[index].$edit)
                    this.putData(this.data[index]);
                this.data[index].$edit = !this.data[index].$edit;
            }
        }
    };
};
tableExampleController.prototype.get_headers = function(){
    var headers = [];
    for (var ind in this.columns){
        headers.push(this.columns[ind].title);
    }
    return headers;
};

tableExampleController.prototype.transform_to_csv = function(content){
    var finalVal = '';

    for (var i = 0; i < content.length; i++) {
        var value = content[i];

        for (var j = 0; j < value.length; j++) {
            var innerValue =  value[j]===null?'':value[j].toString();
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }

        finalVal += '\n';
    }
    return finalVal;
};

tableExampleController.prototype.transform_data_array = function(){
    var content = [];
    var headers = get_headers();
    content.push(headers);

    var selected = get_selected();
    for (var i in selected){
        var intermedio = [];
        for (var j in headers){
            var vbody = selected[i][headers[j]];
            intermedio.push(vbody);
        }
        content.push(intermedio);
    }
    return content;
};

tableExampleController.prototype.export_csv = function(){
    var csvContent = "data:text/csv;charset=utf-8,";
    var content = transform_data_array();
    var contentStr = transform_to_csv(content);
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(contentStr));
    pom.setAttribute('download', 'my_csv.csv');
    pom.click();
};

tableExampleController.prototype.wut = function(){
    console.warn("No existe la funcion");
};



var load_template = function(template, url){
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    var jsCode = request.responseText;

    table.run(function($templateCache) {
        $templateCache.put(template, jsCode);
    });
};
var templates = [{'url' : 'templ/table-footer.html', 'directive' : 'custom/pager'}];

templates.forEach(function(obj){
    load_template(obj.directive, obj.url);
});


table.controller('exampleTableController', ['$scope', '$timeout', '$resource', 'ngTableParams', tableExampleController]);
