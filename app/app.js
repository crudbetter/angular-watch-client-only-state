angular.module('clientOnlyState.controllers', []);
angular.module('clientOnlyState.services', ['ngResource']);

var clientOnlyState = angular.module('clientOnlyState', [
	'clientOnlyState.controllers', 
	'clientOnlyState.services', 
	'ngMockE2E'
]);

clientOnlyState.run(function($httpBackend) {
	$httpBackend.whenGET('/article/1').respond({
		title: 'Some title',
		author: 'Just another author'
	});
});
