describe('Testing dateFormattingService service', function () {
    var params;

    beforeEach(module('dataApp'));
    beforeEach(inject(function (_dateFormat_) {
        params = _dateFormat_;
    }));

    it('Should check if formatDate functions works as expected', function () {

    	var result = params.formatDate("20180507T080000").toString();

        var expected = "Mon May 07 2018 08:00:00 GMT-0700 (Pacific Daylight Time)";

        console.log("date result "+result);

        expect(result).toBe(expected);
    });


    it('Should check if reFormatDate functions works as expected', function () {

        var input = new Date("Mon May 07 2018 08:00:00 GMT-0700 (Pacific Daylight Time)");

        var result = params.reFormatDate(input);

        var expected = "20180507T080000";
        console.log("date result 2 "+result);

        expect(result).toBe(expected);
    });

});