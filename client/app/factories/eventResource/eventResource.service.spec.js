'use strict';

describe('Service: eventResource', function () {

  // load the service's module
  beforeEach(module('letsV2App'));

  // instantiate service
  var eventResource;
  beforeEach(inject(function (_eventResource_) {
    eventResource = _eventResource_;
  }));

  it('should do something', function () {
    expect(!!eventResource).toBe(true);
  });

});
