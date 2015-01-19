'use strict';

endeitfr.controller("editController", function editController($scope, $route, $routeParams, $location, constants, dataRequester, growl){
	$scope.constants = constants;
	$scope.languageIndexesArray = ['de', 'it', 'fr', 'ru', 'gr'];
	
	
	$scope.wordForEdit = $routeParams.word;
	getWordForEdit();
	$scope.currentWordSolution = {};

	$(document).ready(function() {
    	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	});

	function getWordForEdit(){
		dataRequester.getItemByEnWord($scope.wordForEdit, "word", function(data){
				$scope.currentWordSolution = data;
			})
		
	}

	$scope.sendForEdit = function(currentWord){
		$location.path("/edit/" + currentWord);
	}

	$scope.processEdit = function(){
		dataRequester.editItem($scope.currentWordSolution, $scope.wordForEdit, "word", function(){
			growl.success("Successfully edited!");
			$location.path("/home")
		})
	}

	function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    }
})