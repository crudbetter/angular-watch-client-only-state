angular.module('clientOnlyState.services')

	.value('ArticleStates', {
		NONE: 'NONE',
		SAVING: 'SAVING',
		SAVED: 'SAVED',
		ERROR: 'ERROR'
	})

	.factory('wrapMethod', function() {
		return function(object, method, wrapper) {
			var fn = object[method];

			return object[method] = function() {
				return wrapper.apply(this, [fn.bind(this)].concat(
					Array.prototype.slice.call(arguments))
				);
			};
		}
	})

	.factory('Article', function($resource, ArticleStates, wrapMethod) {
		var Article = $resource('/article/:articleId', { articleId: '@id' });

		function updateState(article, newState) {
			article.prevState = article.state;
			article.state = newState;
		};

		wrapMethod(Article, 'get', function(original, params) {
			var article = original(params);
			article.$promise.then(function(article) {
				updateState(article, ArticleStates.NONE);
			});
			return article;
		});

    // Consumers will actually call $save with optional params, success and error arguments  
    // $save consolidates arguments and then calls our wrapper, additionally passing the Resource instance
		wrapMethod(Article, 'save', function(original, params, article, success, error) {
			updateState(article, ArticleStates.SAVING);
			return original.call(this, params, article, function (article) {
				updateState(article, ArticleStates.SAVED);
				success && success(article);
			}, function(response) {
				updateState(article, ArticleStates.ERROR);
				error && error(article);
			});
		});

    // $resource(...) returns a function that also has methods  
    // As such we reference Article's own properties via extend  
    // Which in the case of get and save are already wrapped functions 
		return angular.extend(function(data) {
			var article = new Article(data);
			updateState(article, ArticleStates.NONE);
			return article;
		}, Article);
	});