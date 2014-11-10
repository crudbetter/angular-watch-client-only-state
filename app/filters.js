angular.module('clientOnlyState.filters')
	
	.filter('limitToTransition', function() {
		return function(state, prevState, from, to) {
			if(prevState == from && state == to)
				return to;

			return '';
		};
	})

	.filter('translate', function() {
		return function(text, translations) {
			return translations[text] || translations['default'] || '';
		};
	});