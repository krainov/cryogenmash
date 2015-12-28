app.factory('urlService', function($location) {
	return {
		$location.url();
	};
});