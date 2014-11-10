angular.module('clientOnlyState.controllers')
	
	.controller('ArticleCtrl', function($scope, Article, $resource, ArticleStates) {
		var article = new Article({ id: 1, title: 'A title', author: 'M Godfrey' });

		// Could be injected in...	
		var translations = {};
		translations[ArticleStates.SAVED] = 'Saved, oh yeah!';
		translations['default'] = '';

    $scope.article = article;
    $scope.states = ArticleStates;
    $scope.translations = translations;

    $scope.save = function() {
        article.$save({}, function success() {
            console.log(article.state); // "SAVED"
        }, function error() {
            console.log(article.state); // "ERROR"
        });
    };  

    $scope.$watch('article.state', function(newState, oldState) {
    	if (newState == ArticleStates.SAVED && oldState == ArticleStates.SAVING) {
    		$scope.message = translations[newState];
    	} else {
    		$scope.message = translations['default'];
    	}
    });

	});