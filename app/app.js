angular.module('clientOnlyState.controllers', []);
angular.module('clientOnlyState.services', ['ngResource']);

var clientOnlyState = angular.module('clientOnlyState', [
	'clientOnlyState.controllers', 
	'clientOnlyState.services', 
	'ngMockE2E'
]);

clientOnlyState.run(function($httpBackend, $timeout) {
	$httpBackend.whenGET('/article?id=1').respond({
		id: 1,
		title: 'Some title',
		author: 'Just another author'
	});
	$httpBackend.whenPOST('/article/1').respond(function(method, url, data) {
		var article = angular.fromJson(data);
		return [200, article, {}];
	});
	$httpBackend.whenPOST('/article/2').respond(function(method, url, data) {
		var article = angular.fromJson(data);
		return [500, article, {}];
	});
});
