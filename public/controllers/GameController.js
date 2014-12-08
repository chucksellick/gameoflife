
var engine = require('../../lib/GameOfLife');

var options = {
  width:20,
  height:20
};

angular.module('GameOfLife')
  .controller('GameController', ['$scope','$interval',function($scope, $interval){

    function bind() {
      $scope.grid = $scope.game.cells();
    };

    $scope.init = function() {
      $scope.game = engine.fromSize(options.width,options.height);
      bind();
    }

    $scope.iterate = function() {
      $scope.game.iterate();
    }

    $scope.clear = function() {
      $scope.init();
    }

    var promise;
    $scope.continuous = function(){
      $scope.running = true;
      promise = $interval($scope.iterate, 100);
    };

    $scope.pause = function(){
      $interval.cancel(promise);
      $scope.running = false;
    };

  }]);