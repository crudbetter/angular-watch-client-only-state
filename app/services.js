angular.module('clientOnlyState.services')

	.factory('ArticleList', function(Article) {
		var service = {};

		var selectedArticle;

		service.articles = [
			Article.get({ id: 1 }),
      new Article({ id: 2, title: 'Another title', author: 'J Bloggs' })
		];

		service.getSelectedArticle = function() {
			return selectedArticle;
		};

		service.setSelectedArticle = function(article) {
			selectedArticle = article;
		};

		return service;
	})

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

		wrapMethod(Article, 'get', function(original, options) {
			var article = original(options);
			article.$promise.then(function(data) {
				data.state = ArticleStates.NONE;
			});
			return article;
		});

		wrapMethod(Article, 'save', function(original, params, article, success, error) {
			article.state = ArticleStates.SAVING;
			return original.call(article, params, article, function (article) {
				article.state = ArticleStates.SAVED;
				success && success(article);
			}, function(response) {
				response.data.state = ArticleStates.ERROR;
				error && error(article);
			});
		});

		return angular.extend(function(data) {
			var article = new Article(data);
			article.state = ArticleStates.NONE;
			return article;
		}, Article);
	});