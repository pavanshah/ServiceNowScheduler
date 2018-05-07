var dataApp = angular.module("dataApp", []);

dataApp.factory("data", function(){

	var userHashMap = {};

	var users = [];

	var allowedTimes = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];

	var userJSON = [
		    {
		      "name": "Hashim Amla",
		      "user_id": "26d1f8d9db19320049a1dfea5e961915"
		    },
		    {
		      "name": "AB deVilliers",
		      "user_id": "44513c5ddb19320049a1dfea5e9619e5"
		    },
		    {
		      "name": "Dale Steyn",
		      "user_id": "6ec1b41ddb19320049a1dfea5e961919"
		    },
		    {
		      "name": "Kagiso Rabada",
		      "user_id": "abe1741ddb19320049a1dfea5e9619dc"
		    },
		    {
		      "name": "Faf du Plessis",
		      "user_id": "baa1f85ddb19320049a1dfea5e9619f1"
		    }
		  ];
	

	for(var j = 0 ; j < userJSON.length ; j++)
	{
	  userHashMap[userJSON[j].user_id] = userJSON[j].name;
	  users.push(userJSON[j].name);
	}


	var eventJSON = [{
	    "type": "task",
	    "event_id": "00e0019ddb19320049a1dfea5e96196b",
	    "end_date_time": "20180509T120000",
	    "name": "Project work",
	    "start_date_time": "20180509T080000",
	    "user": "44513c5ddb19320049a1dfea5e9619e5"
	  }, {
	    "type": "task",
	    "event_id": "1324c915db59320049a1dfea5e961926",
	    "end_date_time": "20180507T120000",
	    "name": "Task work",
	    "start_date_time": "20180507T080000",
	    "user": "6ec1b41ddb19320049a1dfea5e961919"
	  }, {
	    "type": "task",
	    "event_id": "15880d95db59320049a1dfea5e96197e",
	    "end_date_time": "20180509T170000",
	    "name": "Research",
	    "start_date_time": "20180509T130000",
	    "user": "baa1f85ddb19320049a1dfea5e9619f1"
	  }, {
	    "type": "meeting",
	    "event_id": "1dbacdd5db59320049a1dfea5e961951",
	    "end_date_time": "20180509T120000",
	    "name": "Meet with customer",
	    "start_date_time": "20180509T080000",
	    "user": "baa1f85ddb19320049a1dfea5e9619f1"
	  }, {
	    "type": "meeting",
	    "event_id": "2a620ddddb19320049a1dfea5e96193a",
	    "end_date_time": "20180506T150000",
	    "name": "Meet with sales",
	    "start_date_time": "20180506T140000",
	    "user": "26d1f8d9db19320049a1dfea5e961915"
	  }, {
	    "type": "task",
	    "event_id": "2c448d55db59320049a1dfea5e9619fe",
	    "end_date_time": "20180508T170000",
	    "name": "Development",
	    "start_date_time": "20180508T130000",
	    "user": "6ec1b41ddb19320049a1dfea5e961919"
	  }, {
	    "type": "task",
	    "event_id": "2cf00ddddb19320049a1dfea5e961937",
	    "end_date_time": "20180510T120000",
	    "name": "Testing",
	    "start_date_time": "20180510T080000",
	    "user": "44513c5ddb19320049a1dfea5e9619e5"
	  }, {
	    "type": "task",
	    "event_id": "38a3fc9ddb19320049a1dfea5e9619ba",
	    "end_date_time": "20180506T120000",
	    "name": "Design",
	    "start_date_time": "20180506T080000",
	    "user": "44513c5ddb19320049a1dfea5e9619e5"
	  }, {
	    "type": "task",
	    "event_id": "4b48c555db59320049a1dfea5e96199e",
	    "end_date_time": "20180507T120000",
	    "name": "Research",
	    "start_date_time": "20180507T080000",
	    "user": "baa1f85ddb19320049a1dfea5e9619f1"
	  }, {
	    "type": "task",
	    "event_id": "503309dddb19320049a1dfea5e9619fe",
	    "end_date_time": "20180506T170000",
	    "name": "Customer support",
	    "start_date_time": "20180506T130000",
	    "user": "6ec1b41ddb19320049a1dfea5e961919"
	  }, {
	    "type": "task",
	    "event_id": "6d64c915db59320049a1dfea5e961926",
	    "end_date_time": "20180510T170000",
	    "name": "On call",
	    "start_date_time": "20180510T130000",
	    "user": "6ec1b41ddb19320049a1dfea5e961919"
	  }, {
	    "type": "meeting",
	    "event_id": "8c294519db59320049a1dfea5e961943",
	    "end_date_time": "20180507T170000",
	    "name": "Meeting with Marketing",
	    "start_date_time": "20180507T130000",
	    "user": "baa1f85ddb19320049a1dfea5e9619f1"
	  }, {
	    "type": "meeting",
	    "event_id": "9013059ddb19320049a1dfea5e961965",
	    "end_date_time": "20180509T150000",
	    "name": "Roadmap",
	    "start_date_time": "20180509T140000",
	    "user": "26d1f8d9db19320049a1dfea5e961915"
	  }, {
	    "type": "meeting",
	    "event_id": "b613cd9ddb19320049a1dfea5e9619c1",
	    "end_date_time": "20180510T150000",
	    "name": "Pre-sales",
	    "start_date_time": "20180510T140000",
	    "user": "26d1f8d9db19320049a1dfea5e961915"
	  }, {
	    "type": "task",
	    "event_id": "bc54cd55db59320049a1dfea5e961997",
	    "end_date_time": "20180509T120000",
	    "name": "Coding",
	    "start_date_time": "20180509T080000",
	    "user": "6ec1b41ddb19320049a1dfea5e961919"
	  }, {
	    "type": "meeting",
	    "event_id": "ce030ddddb19320049a1dfea5e96193d",
	    "end_date_time": "20180508T150000",
	    "name": "Roadmap",
	    "start_date_time": "20180508T140000",
	    "user": "26d1f8d9db19320049a1dfea5e961915"
	  }, {
	    "type": "task",
	    "event_id": "f5b009dddb19320049a1dfea5e961972",
	    "end_date_time": "20180507T120000",
	    "name": "Build user interfaces",
	    "start_date_time": "20180507T080000",
	    "user": "44513c5ddb19320049a1dfea5e9619e5"
	  }, {
	    "type": "task",
	    "event_id": "fcd00ddddb19320049a1dfea5e961906",
	    "end_date_time": "20180508T120000",
	    "name": "Create data models",
	    "start_date_time": "20180508T080000",
	    "user": "44513c5ddb19320049a1dfea5e9619e5"
	  }, {
	    "type": "meeting",
	    "event_id": "fff2c915db59320049a1dfea5e96191d",
	    "end_date_time": "20180507T150000",
	    "name": "All hands",
	    "start_date_time": "20180507T140000",
	    "user": "26d1f8d9db19320049a1dfea5e961915"
	  }];


	  return{
		  getuserJSON : function() {
		  	return userJSON;
		  	},

		  getuserHashMap : function() {
		  	return userHashMap;
		  },

		  geteventJSON : function() {
		  	return eventJSON;
		  },

		  getUsers : function() {
		  	return users;
		  },

		  getAllowedTimes : function(){
		  	return allowedTimes;
		  }
	  };
});