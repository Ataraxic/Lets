'use strict';

describe('Service: scroll', function () {

  // load the service's module
  beforeEach(module('letsV2App'));

  // instantiate service
  var scroll;
  beforeEach(inject(function (_scroll_) {
    scroll = _scroll_;
  }));

  it('should do something', function () {
    expect(!!scroll).toBe(true);
  });

});
