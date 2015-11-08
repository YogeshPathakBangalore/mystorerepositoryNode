
angular.module('app', []).controller("mycontroller", mycontroller)

function mycontroller($scope, $http)
  {

  var jsonObj = {'key':'value'};
   console.log(JSON.stringify(jsonObj));

  var refresh =  function () {

   $http.get('/contactList').success(function (response) {
   	console.log(response);
   	console.log("i got the data that i requested ");
   	$scope.contactList = response;
   });

   }	;

  refresh();

   //add new contact button
   $scope.addContact = function() {
       console.log($scope.contact);
       $http.post('/contactList', $scope.contact).success(function(response) {
       console.log(response);
       refresh();
       });
   };

   //remove button
   $scope.remove = function(id) {
		  console.log(id);
		  $http.delete('/contactList/' + id).success(function(response) {
		    refresh();
		  });
		};

	//edit button
	$scope.edit = function(id) {
	  console.log(id);
	  $http.get('/contactList/' + id).success(function(response) {
	    $scope.contact = response;
	  });
	};  

	//update button
	$scope.update = function() {
	  console.log($scope.contact._id);
	  $http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response) {
	    refresh();
	  })
	};	

	//clear button
	$scope.deselect = function() {
	  $scope.contact = "";
	}

  }

  




	
