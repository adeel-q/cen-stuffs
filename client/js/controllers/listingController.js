angular.module("listings").controller("ListingsController", [
  "$scope",
  "Listings",
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(
      function(response) {
        $scope.listings = response.data;
      },
      function(error) {
        console.log("Unable to retrieve listings:", error);
      }
    );

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
      /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
      if (
        $scope.newListing.hasOwnProperty("address") &&
        $scope.newListing.hasOwnProperty("code") &&
        $scope.newListing.hasOwnProperty("name")
      ) {
        Listings.create($scope.newListing).then(
          function(response) {
            // iff successful, then add to view
            $scope.listings.push($scope.newListing);
          },
          function(error) {
            alert("couldnt add from server! check logs");
            console.log(error);
          }
        );
      }
    };

    $scope.deleteListing = function(listing) {
      /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      var index = 0;
      for (var ind in $scope.listings) {
        if ($scope.listings[ind].name === listing.name) {
          // delete from server
          // remove from view first (so you don't send two delete requests)
          $scope.listings.splice(index, 1);

          Listings.delete($scope.listings[ind]._id).then(
            function(response) {
              // iff successful, delete it locally
              // referesh list
              Listings.getAll().then(
                function(response) {
                  console.log("refreshed list");
                },
                function(error) {
                  console.log(error);
                }
              );
            },
            function(error) {
              alert("couldnt delete from server! check logs");
              console.log(error);
              return;
            }
          );

          return;
        }
        index++;
      }
    };

    $scope.showDetails = function(listing) {
      for (var ind in $scope.listings) {
        if ($scope.listings[ind].code === listing.code) {
          console.log(listing);
          $scope.detailedInfo = $scope.listings[ind];
          return;
        }
      }
    };
  }
]);
