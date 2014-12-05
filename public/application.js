var app = angular.module("GameOfLife", ['ui.router', 'ui.bootstrap', 'ui.utils', 'ngStorage']);
app
  // Setup routes
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('game', {
        url: '/',
        templateUrl: 'partials/game.html'
      });
  }]);