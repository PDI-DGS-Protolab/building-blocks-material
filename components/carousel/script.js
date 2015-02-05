// Code goes here

var app2 = angular.module('main', ['bulli']);

var app = angular.module("bulli", []);

var CarouselCtrl = function($scope) {
  this.images = [];
  this.types = {'Label 1': ['a'],
                'Label 2': ['b'],
                'Label 3': ['c'],
                'Label 4': ['d'],
                'Label 5': ['e']};
  
  var urls = ["https://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/carousel/img/Label 1.svg", 
              "https://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/carousel/img/Label 2.svg", 
              "https://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/carousel/img/Label 3.svg", 
              "https://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/carousel/img/Label 4.svg",
              "https://rawgit.com/PDI-DGS-Protolab/building-blocks-material/master/components/carousel/img/Label 5.svg"];

  
  var mythis = this;
  angular.forEach(urls, function(url){
    mythis.images.push({
      image: url,
      name: url.split("/")[url.split("/").length-1].split(".")[0].toUpperCase(),
      title: "image-" + mythis.images.length,
      id: mythis.images.length,
      cls: ''
    });
  });

  $scope.selected = []; 
  $scope.name_selected = ""; 
  
  $scope.$watch('selected', function(nv){
    $scope.selected = nv;
  });
  
  $scope.update = function(name){
    $scope.$apply(function(){  
      $scope.selected = mythis.types[name];
      $scope.name_selected = name;
    });
  };

  $scope.update_n = function(n){
    $scope.$apply(function(){
      var name = urls[n].split("/")[1].split(".")[0].toUpperCase();
      $scope.selected = mythis.types[name];
      $scope.name_selected = name;
    });
  };

};

app.controller('CarouselCtrl', ['$scope', CarouselCtrl]);
