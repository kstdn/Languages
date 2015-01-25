'use strict';

endeitfr.controller("pageController", function PageController($scope, $location, growl){
	
	$scope.wordToSearch = '';
	$scope.languageToSearch = 'en';

	$scope.processSearch = function(word, lang){
		$location.path("home/words/" + lang + "/" + word);
	}

});