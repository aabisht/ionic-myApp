(function () {
  'use strict';

  app.factory('facadeApiFactory', ['$rootScope', '$http', '$q','$ionicLoading', function($rootScope, $http, $q, $ionicLoading) {

    var collection = {

      getData: function(href) {
        var deferred = $q.defer();
        $http.get(href)
          .then(function(response) {
            var data = response.data;
            deferred.resolve(data);
            return data;
          }, function(error) {
            return "There was an error \n"+ error;
          });
        return deferred.promise;
      },

      updateBrowserTitle: function (_pageName) {
        $rootScope.browserTitle = _pageName;
      },

      showLoading: function () {
        $ionicLoading.show({
          template: 'Loading...'
        });
      },

      hideLoading: function () {
        $ionicLoading.hide();
      }

    }
    return collection;

  }])

})();
