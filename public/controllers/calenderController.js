var schedulerApp = angular.module("schedulerApp");

schedulerApp.controller("calenderController", function($uibModal, $scope, $filter, $rootScope, data, dateFormat){

	var vm = this;

	//To change navigation button text
	$rootScope.defaultView = true;

	//Import all the data from data service
	var eventJSON = data.geteventJSON();
	var userJSON = data.getuserJSON();
	var userHashMap = data.getuserHashMap();
	var users = data.getUsers();
	var allowedTimes = data.getAllowedTimes();

	var selectedEmployeeObject = {};

	vm.selectedDate = new Date();
	vm.events = [];
	vm.events.allowedTimes = allowedTimes;
	vm.addEvent = false;
	vm.addSuccess = false;
	vm.someError = false;


	//Find events for a particular date
	vm.findUserEventsForDate = function() {

		vm.events.eventDetails = [];
		vm.events.userDetails = [];
		vm.someError = false;

		//Creating user objects to store events
		for(var k in userHashMap)
		{
			var userEventDetails = {};
			userEventDetails.userID = k;
			userEventDetails.userName = userHashMap[k];
			var schedule = {};

			for(var l = 0 ; l < vm.events.allowedTimes.length ; l++)
			{
				schedule[vm.events.allowedTimes[l]] = {};
			}
			userEventDetails.schedule = schedule;

			vm.events.userDetails.push(userEventDetails);
		}

		var date = vm.selectedDate;

		for(var i = 0 ; i < eventJSON.length ; i++)
		{
			var start_date = eventJSON[i].start_date_time;
			var end_date = eventJSON[i].end_date_time;

			//Converting to regular date format
			var start_date_now = dateFormat.formatDate(start_date);
			var end_date_now = dateFormat.formatDate(end_date);

			if((date.toDateString() == start_date_now.toDateString()))
			{
				//Creating event objects for selected date
				var eventObject = {};
				eventObject.userName = userHashMap[eventJSON[i].user];
				eventObject.start_date_time = start_date_now;
				eventObject.end_date_time = end_date_now;
				eventObject.type = eventJSON[i].type;
				eventObject.name = eventJSON[i].name;
				eventObject.user = eventJSON[i].user;
				eventObject.event_id = eventJSON[i].event_id;
				vm.events.eventDetails.push(eventObject);

				var start_timeValue = (start_date_now.toTimeString().split(" ")[0]).split(":")[0];
				var end_timeValue = (end_date_now.toTimeString().split(" ")[0]).split(":")[0];

				for(var m = 0 ; m < vm.events.userDetails.length ; m++)
				{
					var user = vm.events.userDetails[m];
					if(user.userID === eventObject.user)
					{
						for(var n = start_timeValue ; n < end_timeValue ; n++)
						{
							n = parseInt(n);
							user.schedule[n] = eventObject;	//Event details stored against user id
						}
					}
				}	
			}
		}

		console.log(vm.events);
	};

	//set grid initially for today's date
	vm.findUserEventsForDate();


	//change date with buttons
	vm.previousDate = function(){
		vm.someError = false;
		vm.addSuccess = false;
		vm.selectedDate = new Date(vm.selectedDate.setDate(vm.selectedDate.getDate() - 1));
		vm.findUserEventsForDate();
	};

	vm.nextDate = function() {
		vm.someError = false;
		vm.addSuccess = false;
		vm.selectedDate = new Date(vm.selectedDate.setDate(vm.selectedDate.getDate() + 1));
		vm.findUserEventsForDate();
	};


	//Check if adding a task here is allowed or not
	vm.addTask = function(userSchedule, columnIndex,rowIndex){
		
		vm.addSuccess = false;
		vm.someError = false;

		if((typeof(userSchedule.name) === 'undefined') && (columnIndex > 0 && columnIndex < 10) && (vm.selectedDate.getDay() != 0) && (vm.selectedDate.getDay() != 6))
		{

			selectedEmployeeObject = vm.events.userDetails[rowIndex];
			vm.employeeName = selectedEmployeeObject.userName;
			vm.taskType = "task";
			vm.timeSlot = vm.events.allowedTimes[columnIndex];

			var modalInput = {};
			modalInput.employeeName = vm.employeeName;
			modalInput.taskType = vm.taskType;
			modalInput.timeSlot = vm.timeSlot;

			var modalInstance = $uibModal.open({
	 			 animation : true,
			     templateUrl: 'layouts/addEventModalLayout.html',
		      	 size: "md",
		      	 controller:'addEventController',
		      	 controllerAs: 'vm',
		      	 resolve: {
					   getInput: function() {
					       return modalInput
					   }
					},
		      	 backdrop : true
	    	});

	     	modalInstance.result.then(function (incomingObject) {
			 	 //Data received from add event modal
			     vm.eventName = incomingObject.eventName;
			     vm.taskType = incomingObject.taskType;
				 vm.addNewEvent();		//Adding event	     
			});
		}
		else
		{
			//print error message
			if(typeof(userSchedule.name) != 'undefined')
			{
				vm.errorMessage = "An event already exists, Can't overlap tasks";
				vm.someError = true;
			}
			else if((vm.selectedDate.getDay() == 0) || (vm.selectedDate.getDay() == 6))
			{
				vm.errorMessage = "You can't add events on weekend";
				vm.someError = true;
			}
			else if(columnIndex <= 0 || columnIndex >= 10)
			{
				vm.errorMessage = "You can only add events between 9 AM-5 PM";
				vm.someError = true;
			}
		}
	}


	vm.addNewEvent = function(){
		var selectedEmployee = selectedEmployeeObject;
		var task = vm.taskType;
		var event = vm.eventName;
		var startTime = vm.timeSlot;

		var newDate = new Date(vm.selectedDate.setHours(startTime, 00, 00))
		var startDate = dateFormat.reFormatDate(newDate);
		var oneHourLater = new Date(newDate.setHours(newDate.getHours()+1));
		var endDate = dateFormat.reFormatDate(oneHourLater);

		//Object to be displayed on calender
		var newEventObject = 
		{
			"type": task,
			"event_id": getUniqueID(),
			"end_date_time": endDate,
			"name": event,
			"start_date_time": startDate,
			"user": selectedEmployee.userID
	  	}

	  	eventJSON.push(newEventObject);
		vm.addEvent = false;
		vm.eventName = "";
		vm.addSuccess = true;

		vm.findUserEventsForDate();
	}


	//Create 32 character unique id for new events
	function getUniqueID() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }

	  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
	}

});