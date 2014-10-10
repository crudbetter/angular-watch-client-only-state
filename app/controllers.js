angular.module('clientOnlyState.controllers')
	
	.controller('DetailCtrl', function($scope, Article) {
		$scope.article = Article.get({ articleId: 1 });
	})

	.controller('MessageCtrl', function($scope) {

	});