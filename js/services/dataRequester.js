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
				url: constants.baseUrl + "classes/" + type + "?limit=1&skip=" + (skip - 1),
				headers : headers})
				.success(function(data, status, headers, config){
					successcb(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
		getItemById: function(wordId, type, successcb){
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
		getItemByWord: function(word, lang, type, successcb){
			var paramsObject = {};
			paramsObject[lang] = word;
			var requestParams = JSON.stringify(paramsObject);
			$http({
				method: 'GET', 
				url: constants.baseUrl + "classes/" + type + "?where=" + requestParams,
				"content-type" : "application/json",
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
		deleteItem: function(wordId, type, successcb){
			$http({
				method: 'DELETE', 
				url: constants.baseUrl + "classes/" + type + "/" + wordId,
				headers : headers
				})
				.success(function(data, status, headers, config){
					successcb(data);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				})
		},
		addItem: function(word, type, successcb){
			$http({
				method: 'POST', 
				url: constants.baseUrl + "classes/" + type,
				headers : headers,
				data : word})
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
		incrementCount: function(type, amount){
			var typeString = type + "RowCount";
			var updatedObject = {};
			updatedObject[typeString] = {"__op":"Increment","amount":amount};
			$http({
				method: 'PUT', 
				url: constants.baseUrl + "classes/count/cryu93LC9U",
				headers : headers,
				data: updatedObject
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