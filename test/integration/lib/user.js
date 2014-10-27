'use strict';

var assert = require('assert');
var user = require('../../../lib/user');

describe('UserRepository', function () {
  var repository;

  beforeEach(function () {
    repository = user.createRepository();
  });

  describe('#create', function () {

    it('should create a user', function (done) {
      repository.create('test@user.com', 'pass', function (error, user) {
        assert.ifError(error);
        assert.ok(user);
        done();
      });
    });

  });

});
