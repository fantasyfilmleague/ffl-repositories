'use strict';

var assert = require('assert');
var Chance = require('chance');
var moment = require('moment');
var cast = require('../../../lib/cast');
var actor = require('../../../lib/actor');
var film = require('../../../lib/film');

describe('CastRepository', function () {
  var actorRepository, filmRepository, repository, chance;

  beforeEach(function () {
    chance = new Chance();
    actorRepository = actor.createRepository();
    filmRepository = film.createRepository();
    repository = cast.createRepository();
  });

  function createFilmActor(callback) {
    actorRepository.create(chance.name(), function (error, actor) {
      assert.ifError(error);
      filmRepository.create(chance.sentence(), moment.utc(), function (error, film) {
        assert.ifError(error);
        callback(film, actor);
      });
    });
  }

  describe('#create', function () {

    it('should create a cast', function (done) {
      createFilmActor(function (film, actor) {
        repository.create(film.id, actor.id, function (error, cast) {
          assert.ifError(error);
          assert.ok(cast);
          done();
        });
      });
    });

  });

});
