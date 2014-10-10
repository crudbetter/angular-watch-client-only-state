angular.module('clientOnlyState.services')

	.factory('Article', function($resource) {
		var Article = $resource('/article/:articleId', { articleId: '@id' });

		return Article;
	});