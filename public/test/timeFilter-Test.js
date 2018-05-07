describe('Testing the time filter', function () {
  'use strict'; 

  var $filter;

  beforeEach(function () {
    module('schedulerApp');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('Should convert a number to equivalent time', function () {
    
    var result = $filter('timeFilter')("8");

    expect(result).toEqual("8 AM");
  });


  it('Should convert time from 24 hour system to 12 hour system', function () {
    
    var result = $filter('timeFilter')("16");

    expect(result).toEqual("4 PM");
  });

});