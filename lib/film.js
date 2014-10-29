'use strict';

var util = require('util');
var fflDb = require('ffl-db');
var moment = require('moment');
var sql = require('sql-bricks-postgres');
var Repository = require('./repository').Repository;

function FilmRepository(db) {
  var me = this;
  Repository.call(me, db);
}

util.inherits(FilmRepository, Repository);

FilmRepository.prototype.create = function (title, releaseDate, callback) {
  var me = this;

  var query = sql.insert('films', {
    title: title,
    released_at: releaseDate.toISOString(),
    created_at: moment.utc().toISOString()
  }).returning('id', 'title', 'released_at', 'created_at');

  me.db.queryOne(query, callback);
};

module.exports = {
  Repository: FilmRepository,
  createRepository: function (db) {
    return new FilmRepository(db || fflDb);
  }
};
