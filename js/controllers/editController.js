'use strict';

endeitfr.controller("editController", function EditController($scope, $route, $routeParams, $location, constants, dataRequester, growl){
	$scope.constants = constants;
	$scope.languageIndexesArray = constants.languageIndexesArray;
	$scope.pronouns = constants.pronouns;
	$scope.widthOfFields = (12 - (12 % ($scope.languageIndexesArray.length + 1))) / ($scope.languageIndexesArray.length + 1);
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        //$scope.processEdit($scope.currentType);
	    }
	});

	$scope.currentAction = "Edit";
	$scope.currentType = $routeParams.type;

	$scope.wordForEditId = $routeParams.wordId;
	getWordForEdit($scope.currentType);
	$scope.currentWordSolution = {};

	$(document).ready(function() {
    	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	});

	function getWordForEdit(type){
		dataRequester.getItemById($scope.wordForEditId, type, function(data){
				$scope.currentWordSolution = data;
			})
		
	}

	$scope.processEdit = function(){
		dataRequester.editItem($scope.currentWordSolution, $scope.wordForEditId, $scope.currentType, function(){
			growl.success("Successfully edited!");
			$location.path("/home/" + $scope.currentType)
		})
	}

	$scope.processDelete = function(){
		dataRequester.deleteItem($scope.wordForEditId, $scope.currentType, function(){
			dataRequester.incrementCount($scope.currentType, -1);
			growl.success("Successfully deleted!");
			$location.path("/home/" + $scope.currentType);
		})
	}

})