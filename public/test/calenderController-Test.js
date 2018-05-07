describe('Test Calender Controller Methods', function(){

	it("Event and user data received from dataService is not null", function(){
		module('schedulerApp');
	
		var scope = {};
		var ctrl;

		inject(function($controller) {
			ctrl = $controller('calenderController', {$scope : scope});
		});

		expect(ctrl.events.allowedTimes).not.toBeNull();
	});


	it("Find calender data for a particular date", function(){
		module('schedulerApp');
	
		var scope = {};
		var ctrl;

		inject(function($controller) {
			ctrl = $controller('calenderController', {$scope : scope});
		});

		var functionResult = ctrl.findUserEventsForDate();

		expect(functionResult).not.toBeNull();
	});

});