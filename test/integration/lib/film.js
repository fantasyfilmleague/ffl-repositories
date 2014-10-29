'use strict';

var assert = require('assert');
var Chance = require('chance');
var moment = require('moment');
var film = require('../../../lib/film');

describe('FilmRepository', function () {
  var repository, chance;

  beforeEach(function () {
    chance = new Chance();
    repository = film.createRepository();
  });

  describe('#create', function () {

    it('should create a film', function (done) {
      repository.create(chance.sentence(), moment.utc(), function (error, film) {
        assert.ifError(error);
        assert.ok(film);
        done();
      });
    });

  });

});
