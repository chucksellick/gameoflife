// Set up a service for tracking the pen colour
function penService(){
  this.pen = null;
}
penService.prototype.setPen = function(val) {
  this.pen = val;
}

angular.module('GameOfLife')
  .service('penService', penService)
  .directive('grid', ['penService', '$document', function(penService, $document){
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $document.bind('mouseup', function(){
          penService.setPen(null);
        });
      }
    }
  }])
  .directive('gridCell', ['penService', function(penService){
    return {
      restrict: 'A',
      scope: {
        cell: '='
      },
      link: function($scope, $element, $attrs) {
        $element.bind('mousedown', function(e){
          // Invert pen colour
          e.preventDefault();
          var pen = !$scope.cell.alive;
          penService.setPen(pen);
        });
        $element.bind('mousemove', function(){
          if(penService.pen !== null && penService.pen !== this.alive) {
            $scope.cell.set(penService.pen);
            $scope.$digest();
          }
        });
      },
      templateUrl: 'partials/cell.html',
    };
  }]);