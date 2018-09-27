angular.module("listings", []).factory("Listings", function($http) {
  var hostname = "https://blackmist-1.herokuapp.com"; //"http://localhost:8080";

  var methods = {
    getAll: function() {
      return $http.get(hostname + "/api/listings");
    },

    create: function(listing) {
      return $http.post(hostname + "/api/listings", listing);
    },

    delete: function(id) {
      /**TODO
        return result of HTTP delete method
       */
      var uri = hostname + "/api/listings/" + id;
      console.log("http://localhost:8080/api/listings/" + id);

      return $http.delete(uri);
    }
  };

  return methods;
});
