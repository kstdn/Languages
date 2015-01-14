'use strict';

endeitfr.controller("homeController", function HomeController($scope, $route, dataRequester){
	$scope.greeting = "Yello";
	//dataRequester.getAllItems("verbs");
	//dataRequester.getWordCount();
	//dataRequester.getVerbsCount();
	//dataRequester.changeWordCount(90);
	//dataRequester.changeVerbsCount(76);
	getRandomWord();
	$scope.currentWordSolution = {};
	$scope.currentWordGuess = {};


	$(document).ready(function() {
    	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	});

	function getRandomWord(){
		dataRequester.getWordCount(function(data){
			var rand = randomFromTo(0, data.results[0].wordRowCount);
			dataRequester.getItem("word", rand, function(data){
				$scope.currentWordSolution = data.results[0];
			})
		});
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
				$("#showNext").removeClass("btn-primary").addClass("btn-success");
			}
		}
    }
})