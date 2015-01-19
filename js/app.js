'use strict';

var endeitfr = angular
	.module("endeitfr", ['ngRoute', 'angular-growl', 'ngAnimate'])
	.config(function($routeProvider){
		$routeProvider
			.when('/home', {
				templateUrl: './templates/home.html',
				controller: 'homeController'
			})
			.when('/verbs', {
				templateUrl: './templates/verbs.html',
				controller: 'verbsController'
			})
			.when('/edit/:word', {
				templateUrl: './templates/edit.html',
				controller: 'editController'
			})
			.otherwise({redirectTo: '/home'})
	})
	.constant("constants", {
	"baseUrl" : "https://api.parse.com/1/",
	"appId" : "qMiyv9G6FvseU2FL60nIOexgBpSUhDRBczYiOekP",
	"restApiKey" : "LzWVae77VjoH5KU3aRwi0UzvI6zlq3xNDOyfhAZT",
	"languageTitles": {'en':'English', 'de':'Deutsch', 'it':'Italiano', 'fr':'Français', 'ru':'Росский', 'gr':'Ελληνικά'}
	})
	.config(['growlProvider', function(growlProvider) {
  		growlProvider.globalTimeToLive(2000);
	}]);