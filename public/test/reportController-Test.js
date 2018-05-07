describe('Test Report Controller Methods', function(){

	it("User data received from dataService is not null", function(){
		module('schedulerApp');
	
		var scope = {};
		var ctrl;

		inject(function($controller) {
			ctrl = $controller('reportController', {$scope : scope});
		});

		expect(ctrl.users).not.toBeNull();
	});



	it("Weekly data method for this week should return data", function(){
		module('schedulerApp');

		var scope = {};
		var ctrl;

		inject(function($controller) {
			ctrl = $controller('reportController', {$scope : scope});
		});

		var functionResult = ctrl.findDataForThisWeek(new Date());

		expect(functionResult).not.toBeNull();
	})

});