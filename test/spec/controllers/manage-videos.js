'use strict';

describe('Controller: ManageVideosCtrl', function () {

  // load the controller's module
  beforeEach(module('youtubemobiApp'));

  var ManageVideosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageVideosCtrl = $controller('ManageVideosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
