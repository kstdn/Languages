'use strict';

endeitfr.controller("homeWithParamsController", function HomeWithParamsController($scope, $route, $location, $routeParams, constants, dataRequester){
	$scope.constants = constants;
	$scope.languageIndexesArray = constants.languageIndexesArray;
	$scope.pronouns = constants.pronouns;
	$scope.widthOfFields = (12 - (12 % ($scope.languageIndexesArray.length + 1))) / ($scope.languageIndexesArray.length + 1);
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        $scope.generateNextWord();
	    }
	});
	$(document).ready(function() {
    	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	});

	$scope.currentAction = "Guess";
	$scope.currentType = $routeParams.type;
	$scope.currentLang = $routeParams.lang;
	$scope.currentWord = $routeParams.word;

	getWord($scope.currentWord, $scope.currentLang, $scope.currentType);

	function getWord(word, lang, type){
		dataRequester.getItemByWord(word, lang, type, function(data){
			$scope.currentWordSolution = data.results[0];
			generateGuessObject();
			$("#" + $scope.languageIndexesArray[0] + "Form input").focus();
		})
	}

	function getRandomWord(type){
		var countIdentifier = type + "RowCount";
		dataRequester.getWordCount(function(data){
			var rand = randomFromTo(1, data.results[0][countIdentifier]);
			dataRequester.getItem(type, rand, function(data){
				
				$scope.currentWordSolution = data.results[0];
				generateGuessObject();
				$("#" + $scope.languageIndexesArray[0] + "Form input").focus();
				
			})
		});
	}

	function generateGuessObject(){
		if($scope.currentType == "words"){
			$scope.currentWordGuess = {};
		} else {
			$scope.currentWordGuess = {};
			for(var key in Object.keys($scope.currentWordSolution))
			{
				var currentKey = Object.keys($scope.currentWordSolution)[key];
				if(currentKey.length == 2){
					if(typeof $scope.currentWordSolution[currentKey] == 'object'){
						$scope.currentWordGuess[currentKey] = {};
					}
				}
			}
			console.log($scope.currentWordGuess);
		}
	}

	$scope.sendForEdit = function(currentWord){
		$location.path("/edit/" + $scope.currentType + "/" + currentWord);
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

			var stillHasUnsuccessful = true;

			for(var lang in $scope.languageIndexesArray){
				if($("#" + $scope.languageIndexesArray[lang] + "Form").hasClass("has-success")){
					stillHasUnsuccessful = false;
				} else {
					stillHasUnsuccessful = true;
				}
			}
				if(!stillHasUnsuccessful){
					$("#showNextButton").removeClass("btn-primary").addClass("btn-success");
				}
		}
    }

    $scope.checkIfTrueForVerbs = function(lang, index){
		if($scope.currentWordSolution[lang][index] == $scope.currentWordGuess[lang][index]){
			$("#" + lang + "-" + index).addClass("has-success");

			var stillHasUnsuccessful = true;

			for(var lang in $scope.languageIndexesArray){
				if($("#" + $scope.languageIndexesArray[lang] + "Form").hasClass("has-success")){
					stillHasUnsuccessful = false;
				} else {
					stillHasUnsuccessful = true;
				}
			}
				if(!stillHasUnsuccessful){
					$("#showNextButton").removeClass("btn-primary").addClass("btn-success");
				}
		
		
		}
    }
})