'use strict';

var assert = require('assert');
var Chance = require('chance');
var moment = require('moment');
var film = require('../../../lib/film');
var dailyFilmGross = require('../../../lib/dailyFilmGross');

describe('DailyFilmGrossRepository', function () {
  var filmRepository, repository, chance;

  beforeEach(function () {
    chance = new Chance();
    filmRepository = film.createRepository();
    repository = dailyFilmGross.createRepository();
  });

  function createFilm(callback) {
    filmRepository.create(chance.sentence(), moment.utc(), function (error, film) {
      assert.ifError(error);
      callback(film);
    });
  }

  describe('#create', function () {

    it('should create a daily film gross', function (done) {
      createFilm(function (film) {
        repository.create(film.id, chance.integer({min: 1, max: 100}), moment.utc(), function (error, gross) {
          assert.ifError(error);
          assert.ok(gross);
          done();
        });
      });
    });

  });

});
