var schedulerApp = angular.module("schedulerApp");

schedulerApp.filter("timeFilter", function(){
	
	return function(timeValue){
		switch(timeValue){
			case "8" :
				return "8 AM";
			case "9" : 
				return "9 AM";
			case "10" :
				return "10 AM";
			case "11" :
				return "11 AM";
			case "12" :
				return "12 PM";
			case "13" :
				return "1 PM";
			case "14" :
				return "2 PM";
			case "15" :
				return "3 PM";
			case "16" :
				return "4 PM"
			case "17" :
				return "5 PM"
			case "18" :
				return "6 PM"
			case "19" :
				return "7 PM"
		}
	}

});