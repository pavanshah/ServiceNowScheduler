var schedulerApp = angular.module("schedulerApp");

schedulerApp.controller("addEventController", function($scope, $uibModalInstance, getInput){

	var vm = this;

	var inputObject = getInput;

	console.log("inputObject "+inputObject.employeeName);

	vm.employeeName = inputObject.employeeName;
	vm.taskType = inputObject.taskType;
	vm.timeSlot = inputObject.timeSlot;
	vm.eventName = "";

	vm.submit = function()
	{
		console.log("all Values = "+vm.employeeName+" "+vm.taskType+" "+vm.timeSlot+" "+vm.eventName);
		var outputObject = {};
		outputObject.employeeName = vm.employeeName;
		outputObject.taskType = vm.taskType;
		outputObject.timeSlot = vm.timeSlot;
		outputObject.eventName = vm.eventName;

		$uibModalInstance.close(outputObject);
	}


	vm.close = function()
	{
		$uibModalInstance.dismiss();
	}

});