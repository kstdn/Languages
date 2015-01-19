'use strict';

endeitfr.factory('dataRequester', function($http, constants){
	
	var headers = {
					"X-Parse-Application-Id" : constants.appId,
					"X-Parse-REST-API-Key" : constants.restApiKey
					};

	return {
		getAllItems: function(type, successcb){
			$http({
				method: 'GET', 
				url: constants.baseUrl + "classes/" + type + "?limit=1000",
				headers : headers})
				.success(function(data, status, headers, config){
					console.log(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
		getItem: function(type, skip, successcb){
			$http({
				method: 'GET', 
				url: constants.baseUrl + "classes/" + type + "?limit=1&skip=" + skip,
				headers : headers})
				.success(function(data, status, headers, config){
					successcb(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
		getItemByEnWord: function(wordId, type, successcb){
			$http({
				method: 'GET', 
				url: constants.baseUrl + "classes/" + type + "/" + wordId,
				headers : headers})
				.success(function(data, status, headers, config){
					successcb(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
		editItem: function(updatedObject, wordId, type, successcb){
			$http({
				method: 'PUT', 
				url: constants.baseUrl + "classes/" + type + "/" + wordId,
				headers : headers,
				data : updatedObject,
				"content-type": "application/json"})
				.success(function(data, status, headers, config){
					successcb(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
		getWordCount: function(successcb){
			$http({
				method: 'GET', 
				url: constants.baseUrl + "classes/count",
				headers : headers})
				.success(function(data, status, headers, config){
					successcb(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
		changeWordCount: function(newCount, successcb){
			$http({
				method: 'PUT', 
				url: constants.baseUrl + "classes/count/cryu93LC9U",
				headers : headers,
				data: {"wordRowCount" : newCount}
			})
				.success(function(data, status, headers, config){
					console.log(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
		getVerbsCount: function(successcb){
			$http({
				method: 'GET', 
				url: constants.baseUrl + "classes/count",
				headers : headers})
				.success(function(data, status, headers, config){
					successcb(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
		changeVerbsCount: function(newCount, successcb){
			$http({
				method: 'PUT', 
				url: constants.baseUrl + "classes/count/cryu93LC9U",
				headers : headers,
				data: {"verbsRowCount" : newCount}
			})
				.success(function(data, status, headers, config){
					console.log(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
	}
})