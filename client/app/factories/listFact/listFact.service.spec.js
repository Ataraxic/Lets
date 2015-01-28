'use strict';

describe('Service: listFact', function () {

  // load the service's module
  beforeEach(module('letsV2App'));

  // instantiate service
  var listFact;
  beforeEach(inject(function (_listFact_) {
    listFact = _listFact_;
  }));

  it('should do something', function () {
    expect(!!listFact).toBe(true);
  });

});
