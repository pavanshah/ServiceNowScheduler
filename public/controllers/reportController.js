var schedulerApp = angular.module("schedulerApp");

schedulerApp.controller("reportController", function($scope, $rootScope, data, dateFormat){

	var vm = this;

	$rootScope.defaultView = false;
	$scope.dataForHighcharts = [];

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

		var datesThisWeek = [];
		$scope.dataForHighcharts = [];

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
				var start_date = eventJSON[i].start_date_time;
				var end_date = eventJSON[i].end_date_time;

				var start_date_now = dateFormat.formatDate(start_date);
				var end_date_now = dateFormat.formatDate(end_date);

				if((date.toDateString() == start_date_now.toDateString()))
				{	
					var userid = eventJSON[i].user;
					var timeDifference = end_date_now.getHours() - start_date_now.getHours();
					
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

		for(var i = 0 ; i < vm.weeklyResult.length ; i++)
		{
			var highchartsObject = {};
			highchartsObject.name = vm.weeklyResult[i].name;
			highchartsObject.y = vm.weeklyResult[i].totalTimeOccupied;
			$scope.dataForHighcharts.push(highchartsObject);
		}

		drawPieChart();
		return vm.weeklyResult;
	};

	vm.findDataForThisWeek(sunday);

	vm.getSortClass = function(){
		if(vm.reverse){
			return 'arrow-down';
		}
		else
		{
			return 'arrow-up';
		}
	}


function drawPieChart(){

	Highcharts.chart('container', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
	        text: 'Total no. of hours occupied this Week/Employee'
	    },
	    tooltip: {
	        pointFormat: '{series.name}: <b>{point.y}</b>'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                format: '<b>{point.name}</b>: {point.y}'+' Hours',
	                style: {
	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                }
	            }
	        }
	    },
	    series: [{
	        name: 'No. of hours occupied',
	        colorByPoint: true,
	        data: $scope.dataForHighcharts
	    	}]
		});

}

});