'use strict';

endeitfr.controller("homeController", function HomeController($scope, $route, $location, $routeParams, constants, dataRequester, growl){
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

	

	$scope.fetchPronunciations = function(word, lang) {
	  	var baseURL = 'http://apifree.forvo.com/key/2350d616232f51021bf2f076ac6e20c6/format/json/action/word-pronunciations/word/';
	    var url = baseURL + encodeURIComponent(word);
	    if (lang) url = url + '/language/' + encodeURIComponent(lang);

	    var cbk = 'forvo_' + new Date().getTime();
	    url = url + '/callback/' + cbk;

	    window[cbk] = function(data) {
	      delete window[cbk];

	      var items = data.items;

	      if (!items || !items.length) {
	        return growl.error("No audio results found.")
	      }

	      showResults(items);
	    };

	    var s = document.createElement('script');
	    s.src = url;
	    document.body.appendChild(s);
	}

	function showResults(results) {
    	var old = document.getElementById('forvo-results');
    	if (old) old.parentNode.removeChild(old);

    	var resultsHtml = '<ol style="padding-left: 10px;">';

	    for (var n = 0; n < results.length; n++) {
	      var result = results[n];
	      resultsHtml += (''
	        + '<li style="padding-top: 5px;' + (n < (results.length - 1) ? 'padding-bottom:5px; border-bottom:1px #555 solid;' : '') + '">'
	          + '<strong>' + result.word + '</strong> '
	          + '<span style="color: #999;">(' + result.code + ')</span> '
	          + '<span style="cursor:pointer;" class="play">&#9654;</span> '
	          + '<audio src="' + result.pathmp3 + '"' + (n === 0 ? '' : '') + '></audio>'
	        + '</li>'
	      );
    	}

    resultsHtml += '</ol>';

    var con = document.createElement('div');
    con.style.position = 'absolute';
    con.style.left = '50%';
    con.style.top = '50%';
    con.style.minWidth = '120px';
    con.style.background = '#252525';
    con.style.color = '#eee';
    con.style.padding = '30px';
    con.style.textAlign = 'left';
    con.style.WebkitTransform = 'translateX(-50%) translateY(-50%)';
    con.style.transform = 'translateX(-50%) translateY(-50%)';

    con.innerHTML = resultsHtml;

    var bg = document.createElement('div');
    bg.style.position = 'fixed';
    bg.style.left = '0';
    bg.style.top = '0';
    bg.style.width = '100%';
    bg.style.height = '100%';
    bg.style.zIndex = '9999999999';
    bg.style.background = 'rgba(227, 223, 229, 0.5)';

    bg.id = 'forvo-results';

    bg.appendChild(con);
    document.body.appendChild(bg);

    con.addEventListener('click', function(e) {
      e.stopPropagation();

      if (e.target.className === 'play') {
        var audio = e.target.parentNode.querySelector('audio');
        audio.load();
        audio.play();
      }
    });

    bg.addEventListener('click', function() {
      bg.parentNode.removeChild(bg);
    });
  	}
	
	getRandomWord($scope.currentType);


	function getRandomWord(type){
		var countIdentifier = type + "RowCount";
		dataRequester.getWordCount(function(data){
			var rand = randomFromTo(1, data.results[0][countIdentifier]);
			dataRequester.getItem(type, rand, function(data){
				
				$scope.currentWordSolution = data.results[0];
				generateEmptyObject();
				$("#" + $scope.languageIndexesArray[0] + "Form input").focus();
				
			})
		});
	}

	function generateEmptyObject(){
		if($scope.currentType != "verbs"){
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