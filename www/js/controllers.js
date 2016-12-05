angular.module('starter.controllers', [])

.controller('HeaderController', ['$scope', 'CONSTANTS', function ($scope, CONSTANTS) {
  $scope.title = CONSTANTS.app.title;
}])

.controller('AppController', ['$scope', 'CONSTANTS', 'facadeApiFactory', '$ionicSlideBoxDelegate', function($scope, CONSTANTS, facadeApiFactory, $ionicSlideBoxDelegate) {

  var self = this;

  function init() {

    var dataURL = CONSTANTS.base_API_URL+"/page/1";

    facadeApiFactory.showLoading();
    facadeApiFactory.getData(dataURL)
      .then(function (data) {
        self.movieData = data;
        facadeApiFactory.updateBrowserTitle(data.page_title);
        facadeApiFactory.hideLoading();
      }, function (error) {
        error.log(error);
      });

  }

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  }

  init();
}])

.controller('MovieController', ['$scope', 'CONSTANTS', 'facadeApiFactory', function($scope, CONSTANTS, facadeApiFactory) {
  var self = this;

  self.dataPost = [];

  self.pageNumber = 1;

  self.getPageData = function() {
    var dataURL = CONSTANTS.base_API_URL+"/page/"+self.pageNumber;
    facadeApiFactory.getData(dataURL)
      .then(function (data) {
        self.data = data;
        for(i=0; i< data.posts.length; i++){
          self.dataPost.push(data.posts[i]);
        }
        CONSTANTS.app.logo = data.logo;
        CONSTANTS.app.title = data.title;
        facadeApiFactory.updateBrowserTitle(data.page_title);
        facadeApiFactory.hideLoading();
      }, function (error) {
        error.log(error);
      });
    ++self.pageNumber;
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  facadeApiFactory.showLoading();
  function init() {
    self.getPageData();
  }
  init();
}])

.controller('MovieDetailController', ['$scope','CONSTANTS','facadeApiFactory','$stateParams', function($scope, CONSTANTS, facadeApiFactory, $stateParams) {
  var self = this;
  var movieURL = CONSTANTS.base_API_URL+'/'+$stateParams.movie;
  facadeApiFactory.showLoading();
  function init() {
    facadeApiFactory.getData(movieURL)
      .then(function (data) {
        console.log(data)
      }, function (error) {
        error.log(error);
      });
  }
  init();

}])
