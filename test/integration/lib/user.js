'use strict';

var assert = require('assert');
var Chance = require('chance');
var user = require('../../../lib/user');

describe('UserRepository', function () {
  var repository, chance;

  beforeEach(function () {
    chance = new Chance();
    repository = user.createRepository();
  });

  describe('#create', function () {

    it('should create a user', function (done) {
      repository.create(chance.email(), chance.word(), function (error, user) {
        assert.ifError(error);
        assert.ok(user);
        done();
      });
    });

  });

  describe('#findByEmail', function () {

    it('should find user by email if it exists', function (done) {
      var email = chance.email();

      repository.create(email, chance.word(), function (error) {
        assert.ifError(error);

        repository.findByEmail(email, function (error, user) {
          assert.ifError(error);
          assert.ok(user);
          done();
        });
      });
    });

    it('should not find user by email if it does not exist', function (done) {
      repository.findByEmail(chance.email(), function (error, user) {
        assert.ifError(error);
        assert.ok(!user);
        done();
      });
    });

  });

});
