'use strict';

endeitfr.controller("addController", function AddController($scope, $route, $routeParams, $location, constants, dataRequester, growl){
	$scope.constants = constants;
	$scope.languageIndexesArray = constants.languageIndexesArray;
	$scope.pronouns = constants.pronouns;
	$scope.widthOfFields = (12 - (12 % ($scope.languageIndexesArray.length + 1))) / ($scope.languageIndexesArray.length + 1);
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        $scope.processEdit($scope.currentType);
	    }
	});
	$(document).ready(function() {
    	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	});

	$scope.currentAction = "Add";
	$scope.currentType = $routeParams.type;
	
	getDummyWord($scope.currentType);

	function getDummyWord(type){
		dataRequester.getItem(type, 1, function(data){
				$scope.dummyWord = data.results[0];
				$scope.currentWordSolution = $scope.dummyWord;
				generateEmptyObject();
			})
		
	}

	function generateEmptyObject(){
		if($scope.currentType != "verbs"){
			$scope.wordToAdd = {};
		} else {
			$scope.wordToAdd = {};
			for(var key in Object.keys($scope.dummyWord))
			{
				var currentKey = Object.keys($scope.dummyWord)[key];
				if(currentKey.length == 2){
					if(typeof $scope.dummyWord[currentKey] == 'object'){
						$scope.wordToAdd[currentKey] = {};
					}
				}
			}
			console.log($scope.wordToAdd);
		}
	}

	$scope.processAddition = function(){
		dataRequester.addItem($scope.wordToAdd, $scope.currentType, function(){
			growl.success("Successfully added!");
			$location.path("/home/" + $scope.currentType)
		})
	}

})