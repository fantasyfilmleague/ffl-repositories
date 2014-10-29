'use strict';

var assert = require('assert');
var Chance = require('chance');
var actor = require('../../../lib/actor');

describe('ActorRepository', function () {
  var repository, chance;

  beforeEach(function () {
    chance = new Chance();
    repository = actor.createRepository();
  });

  describe('#create', function () {

    it('should create an actor', function (done) {
      repository.create(chance.name(), function (error, actor) {
        assert.ifError(error);
        assert.ok(actor);
        done();
      });
    });

  });

  describe('#findByName', function () {

    it('should find actor by name if it exists', function (done) {
      var name = chance.name();

      repository.create(name, function (error) {
        assert.ifError(error);

        repository.findByName(name, function (error, actor) {
          assert.ifError(error);
          assert.ok(actor);
          done();
        });
      });
    });

    it('should not find actor by name if it does not exist', function (done) {
      repository.findByName(chance.name(), function (error, actor) {
        assert.ifError(error);
        assert.ok(!actor);
        done();
      });
    });

  });

});
