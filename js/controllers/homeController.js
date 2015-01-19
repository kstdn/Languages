'use strict';

endeitfr.controller("homeController", function HomeController($scope, $route, $location, constants, dataRequester){
	$scope.constants = constants;
	$scope.languageIndexesArray = ['de', 'it', 'fr', 'ru', 'gr'];
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        $scope.generateNextWord();
	    }
	});
	$(document).ready(function() {
    	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	});
	


	getRandomWord();

	$scope.currentWordSolution = {};
	$scope.currentWordGuess = {};


	function getRandomWord(){
		dataRequester.getWordCount(function(data){
			var rand = randomFromTo(0, data.results[0].wordRowCount);
			dataRequester.getItem("word", rand, function(data){
				$scope.currentWordSolution = data.results[0];
				$("#" + $scope.languageIndexesArray[0] + "Form input").focus();
			})
		});
	}

	$scope.sendForEdit = function(currentWord){
		$location.path("/edit/" + currentWord);
	}

	function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    }

    $scope.generateNextWord = function(){
    	$route.reload();
    }

    $scope.checkIfTrue = function(lang){
		if($scope.currentWordSolution[lang] == $scope.currentWordGuess[lang]){
			$("#" + lang + "Form").addClass("has-success");
			if($("#enForm").hasClass("has-success") &&
				$("#deForm").hasClass("has-success") &&
				$("#frForm").hasClass("has-success") &&
				$("#itForm").hasClass("has-success")){
				$("#showNextButton").removeClass("btn-primary").addClass("btn-success");
			}
		}
    }
})