'use strict';

var assert = require('assert');
var Chance = require('chance');
var user = require('../../../lib/user');
var league = require('../../../lib/league');

describe('LeagueRepository', function () {
  var repository, chance, userRepository;

  beforeEach(function () {
    chance = new Chance();
    repository = league.createRepository();
    userRepository = user.createRepository();
  });

  describe('#create', function () {

    it('should create a league', function (done) {
      userRepository.create(chance.email(), chance.word(), function (error, user) {
        assert.ifError(error);

        repository.create(user.id, chance.sentence(), function (error, league) {
          assert.ifError(error);
          assert.ok(league);
          done();
        });
      });
    });

  });

});
