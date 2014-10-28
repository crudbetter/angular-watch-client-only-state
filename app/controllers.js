angular.module('clientOnlyState.controllers')

	.controller('ListCtrl', function($scope, ArticleList) {
    $scope.articles = ArticleList.articles;

    $scope.selectArticle = ArticleList.setSelectedArticle;
	})
	
	.controller('DetailCtrl', function($scope, ArticleList, $resource, ArticleStates) {
		$scope.$watch(ArticleList.getSelectedArticle, function(selectedArticle) {
			$scope.article = selectedArticle;
		});

		$scope.save = function(article) {
			article.$save({}, function success() {
				console.log(arguments);
			}, function error() {
				console.log(arguments);
			}).then(function() {
				console.log(arguments); 
			});
		};

	})

	.controller('MessageCtrl', function($scope, ArticleList, ArticleStates) {
		$scope.$watch(ArticleList.getSelectedArticle, function(article) {
			$scope.article = article;
		});
		$scope.$watch('article.state', function(newState, oldState) {
			if (newState == ArticleStates.SAVED && oldState ==  ArticleStates.SAVING) {
				alert("SAVED");
			}
		});
	});