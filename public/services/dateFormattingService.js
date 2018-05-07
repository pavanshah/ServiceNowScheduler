var dateFormattingApp = angular.module("dateFormattingApp", []);

dataApp.factory("dateFormat", function(){

	  return{
		
		formatDate : function(dateString) {

			var year = dateString.slice(0,4);
			var month = dateString.slice(4,6);
			var day = dateString.slice(6,8);
			var hh = dateString.slice(9,11);
			var mm = dateString.slice(11,13);
			var ss = dateString.slice(13,15);

			return new Date(year, month-1, day, hh, mm, ss, 0);
		},

		reFormatDate : function(date) {

			var year = date.getFullYear();
			var month = ("0" + (date.getMonth() + 1)).slice(-2);
			var day = ("0" + date.getDate()).slice(-2);
			var hh = ("0" + date.getHours()).slice(-2);
			var mm = ("0" + date.getMinutes()).slice(-2);;
			var ss = ("0" + date.getSeconds()).slice(-2);;

			var dateString = year+month+day+"T"+hh+mm+ss;

			return dateString;
		}

	  };
});