describe('Testing data service', function () {
    var params;

    beforeEach(module('dataApp'));
    beforeEach(inject(function (_data_) {
        params = _data_;
    }));

    it('Should check if user data is available', function () {

    	var userData = params.getuserJSON();

        expect(userData).not.toBeNull();
    });

    it('Should check if 1st user is Hashim Amla', function () {

    	var userData = params.getuserJSON();
    	var userName = userData[0].name;
        expect(userName).toBe("Hashim Amla");
    });


    it('Should check if event data is available', function () {

    	var eventData = params.geteventJSON();

        expect(eventData).not.toBeNull();
    });

    it('Should check if getAllowedTimes return an expected array', function () {

    	var result = params.getAllowedTimes();
    	var allowedTimes = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
        expect(result).toEqual(allowedTimes);
    });

});