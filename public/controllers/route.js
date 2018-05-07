var schedulerApp = angular.module("schedulerApp");

schedulerApp
	.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when("/calender", {
			templateUrl : "/layouts/calenderLayout.html",
			controller : "calenderController as vm"
		})
		.when("/report", {
			templateUrl : "/layouts/reports.html",
			controller : "reportController as vm"
		})
		.otherwise({
			redirectTo : "/calender"
		})
	})