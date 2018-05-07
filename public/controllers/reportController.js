var schedulerApp = angular.module("schedulerApp");

schedulerApp.controller("reportController", function($scope, $rootScope, data, dateFormat){

	var vm = this;

	var eventJSON = data.geteventJSON();
	var userJSON = data.getuserJSON();
	var userHashMap = data.getuserHashMap();
	vm.users = data.getUsers();
	vm.weeklyResult = [];
	vm.resultObject = {};
	vm.reverse = false;

	var curr = new Date; // get current date
	var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
	var last = first + 6; // last day is the first day + 6

	var sunday = new Date(curr.setDate(first)); //sunday

	vm.findDataForThisWeek = function(sunday){

		console.log("sunday "+sunday);
		var datesThisWeek = [];

		for(var k in userHashMap)
		{
			var userObject = {};
			userObject.name = userHashMap[k];
			userObject.id = k;
			userObject.dateAndWork = {};
			userObject.totalTimeOccupied = 0;
			vm.weeklyResult.push(userObject);
		}

		for(var j = 1 ; j <= 5 ; j++)
		{
			var date = new Date();
			date.setDate(sunday.getDate() + j);
			console.log("date "+date);

			var dateToLocale = date.toLocaleDateString();
			datesThisWeek.push(dateToLocale);

			for(var k in userHashMap)
			{
				for(var l = 0 ; l < vm.weeklyResult.length ; l++)
				{
					if(vm.weeklyResult[l].id === k)
					{
						vm.weeklyResult[l].dateAndWork[dateToLocale] = 0;
					}
				}
			}


			for(var i = 0 ; i < eventJSON.length ; i++)
			{
				console.log("inside");
				var start_date = eventJSON[i].start_date_time;
				var end_date = eventJSON[i].end_date_time;

				var start_date_now = dateFormat.formatDate(start_date);
				var end_date_now = dateFormat.formatDate(end_date);

				console.log("date "+date);
				console.log("start_date_now "+start_date_now);

				if((date.toDateString() == start_date_now.toDateString()))
				{	
					var userid = eventJSON[i].user;
					console.log("user "+userid);
					var timeDifference = end_date_now.getHours() - start_date_now.getHours();
					console.log("timeDifference "+timeDifference);
					
					for(var l = 0 ; l < vm.weeklyResult.length ; l++)
					{
						if(vm.weeklyResult[l].id === userid)
						{
							vm.weeklyResult[l].totalTimeOccupied = vm.weeklyResult[l].totalTimeOccupied + timeDifference;
							vm.weeklyResult[l].dateAndWork[dateToLocale] = vm.weeklyResult[l].dateAndWork[dateToLocale] + timeDifference;
						}
					}

				}
			}

		}

		vm.resultObject.weeklyResult = vm.weeklyResult;
		vm.resultObject.datesThisWeek = datesThisWeek;
		console.log("weeklyResult "+vm.weeklyResult);

	};

	vm.findDataForThisWeek(sunday);
});