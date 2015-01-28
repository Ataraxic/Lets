'use strict';

describe('Service: responseFact', function () {

  // load the service's module
  beforeEach(module('letsV2App'));

  // instantiate service
  var responseFact;
  beforeEach(inject(function (_responseFact_) {
    responseFact = _responseFact_;
  }));

  it('should do something', function () {
    expect(!!responseFact).toBe(true);
  });

});
