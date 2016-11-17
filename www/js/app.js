var app = angular.module('starter', ['ionic', 'starter.controllers']);

app.run(function($ionicPlatform, facadeApiFactory) {

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  facadeApiFactory.updateBrowserTitle("Test");

})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
      templateUrl: '../templates/index.html',
      url: '/index',
      controller: 'AppController',
      controllerAs: 'AppCtrl'
    })
    .state('movies', {
      templateUrl: '../templates/movies.html',
      url: '/movies',
      controller: 'MovieController',
      controllerAs: 'MovieCtrl'
    })
    .state('moviePageView', {
      templateUrl: '../templates/movie-view.html',
      url: '/movie/{movie}',
      controller: 'MovieDetailController',
      controllerAs: 'MovieDetailCtrl'
    })
  $urlRouterProvider.otherwise('index');
});


app.constant('CONSTANTS', {

  app: {
    logo: "",
    title: "Yify"
  },

  base_API_URL: "http://testnode25.herokuapp.com"

});
