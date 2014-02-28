'use strict';

describe('Service: serverPrefix', function () {

  // load the service's module
  beforeEach(module('youtubemobiApp'));

  // instantiate service
  var serverPrefix;
  beforeEach(inject(function (_serverPrefix_) {
    serverPrefix = _serverPrefix_;
  }));

  it('should do something', function () {
    expect(!!serverPrefix).toBe(true);
  });

});
