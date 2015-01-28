'use strict';

describe('Service: contactsFact', function () {

  // load the service's module
  beforeEach(module('letsV2App'));

  // instantiate service
  var contactsFact;
  beforeEach(inject(function (_contactsFact_) {
    contactsFact = _contactsFact_;
  }));

  it('should do something', function () {
    expect(!!contactsFact).toBe(true);
  });

});
