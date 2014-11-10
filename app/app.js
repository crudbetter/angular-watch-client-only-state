angular.module('clientOnlyState.controllers', []);
angular.module('clientOnlyState.services', ['ngResource']);
angular.module('clientOnlyState.filters', []);

var clientOnlyState = angular.module('clientOnlyState', [
	'clientOnlyState.controllers', 
	'clientOnlyState.services', 
	'clientOnlyState.filters',
	'ngMockE2E'
]);

clientOnlyState.run(function($httpBackend) {
	var counter = 0;

	$httpBackend.whenPOST('/article/1').respond(function(method, url, data) {
		counter++;
		var article = angular.fromJson(data);
		return [counter % 2 ? 200 : 500, article, {}];
	});
});
