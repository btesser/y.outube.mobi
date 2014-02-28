'use strict';

describe('Service: suits', function () {

  // load the service's module
  beforeEach(module('youtubemobiApp'));

  // instantiate service
  var suits;
  beforeEach(inject(function (_suits_) {
    suits = _suits_;
  }));

  it('should do something', function () {
    expect(!!suits).toBe(true);
  });

});
