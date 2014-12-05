var engine = require('GameOfLife');
var options = {
  width:10,
  height:10
};

angular.module('GameOfLife')
  .controller('GameController', [$scope,function($scope){

    $scope.game = engine.fromSize(width,height);

    function bind() {
      $scope.grid = $scope.game.cells();
    };

  }]);