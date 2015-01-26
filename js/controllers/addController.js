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
	// $(document).ready(function() {
 //    	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	// });

	$scope.currentAction = "Add";
	$scope.currentType = $routeParams.type;
	$scope.currentWordSolution = {};
	$scope.currentWordSolution.notes = "dummy";
	
	//getDummyWord($scope.currentType);

	if($scope.currentType == "verbs"){
		getDummyWord($scope.currentType)
	} else {
		$scope.wordToAdd = {};
	}

	function getDummyWord(type){
		dataRequester.getItem(type, 1, function(data){
				$scope.dummyWord = data.results[0];
				$scope.currentWordSolution = $scope.dummyWord;
				generateEmptyVerb();
			})
	}

	function generateEmptyVerb(){
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
	}

	$scope.processAddition = function(){
		dataRequester.addItem($scope.wordToAdd, $scope.currentType, function(){
			growl.success("Successfully added!");
			$route.reload();
		})
	}

})
