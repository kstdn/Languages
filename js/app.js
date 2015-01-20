'use strict';

var endeitfr = angular
	.module("endeitfr", ['ngRoute', 'angular-growl', 'ngAnimate'])
	.config(function($routeProvider){
		$routeProvider
			.when('/home/:type', {
				templateUrl: './templates/home.html',
				controller: 'homeController'
			})
			.when('/add/:type', {
				templateUrl: './templates/home.html',
				controller: 'addController'
			})
			.when('/home/:type/:lang/:word', {
				templateUrl: './templates/home.html',
				controller: 'homeWithParamsController'
			})
			.when('/edit/:type/:wordId', {
				templateUrl: './templates/home.html',
				controller: 'editController'
			})
			.otherwise({redirectTo: '/home/words'})
	})
	.constant("constants", {
	"baseUrl" : "https://api.parse.com/1/",
	"appId" : "qMiyv9G6FvseU2FL60nIOexgBpSUhDRBczYiOekP",
	"restApiKey" : "LzWVae77VjoH5KU3aRwi0UzvI6zlq3xNDOyfhAZT",
	"languageTitles": {'en':'English', 'de':'Deutsch', 'it':'Italiano', 'fr':'Français', 'ru':'Росский', 'gr':'Ελληνικά'},
	"pronouns": {'it':["infinito", "io", "tu", "lui/lei", "noi", "voi", "loro"], 'fr':["infinitif", "je", "tu", "il/elle", "nous", "vous", "ils/elles"]},
	"languageIndexesArray": ['de', 'it', 'fr']
	})
	.config(['growlProvider', function(growlProvider) {
  		growlProvider.globalTimeToLive(2000);
	}]);