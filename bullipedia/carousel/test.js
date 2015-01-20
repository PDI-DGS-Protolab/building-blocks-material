var app = angular.module("MyApp", []);

var DemoCtrl = function($scope) {
  this.images = [];
  this.types = {'VEG': ['Tofu','Champiñones','Jaca','Berenjena','Lentejas'],
                'FRUIT': ['Naranja','Mandarina','Manzana','Pera','Platano'],
                'MEAT': ['Vaca', 'Ternera', 'Pollo', 'Buey', 'Jabali']};


  var urls = ["img/veg.png", "img/fruit.png","img/meat.png"];

  var mythis = this;
  angular.forEach(urls, function(url){
    mythis.images.push({
      image: url,
      name: url.split("/")[1].split(".")[0].toUpperCase(),
      title: "image-" + mythis.images.length,
      id: mythis.images.length,
      cls: ''
    });
  });

    this.selected = this.types[this.images[0].name];
    
  $scope.update = function(name){
      mythis.selected = mythis.types[name];
      $scope.$apply();
  };
};

app.controller("DemoCtrl", ['$scope', DemoCtrl]);
