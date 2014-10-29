'use strict';

var util = require('util');
var fflDb = require('ffl-db');
var moment = require('moment');
var sql = require('sql-bricks-postgres');
var Repository = require('./repository').Repository;

function CastRepository(db) {
  var me = this;
  Repository.call(me, db);
}

util.inherits(CastRepository, Repository);

CastRepository.prototype.findByFilmId = function (filmId, callback) {
  var me = this;

  var query = sql.select('*')
    .from('casts')
    .where('film_id', filmId);

  me.db.query(query, callback);
};

CastRepository.prototype.create = function (filmId, actorId, callback) {
  var me = this;

  var query = sql.insert('actors', {
    film_id: filmId,
    actor_id: actorId,
    created_at: moment.utc().toISOString()
  }).returning('id', 'film_id', 'actor_id', 'created_at');

  me.db.queryOne(query, callback);
};

module.exports = {
  Repository: CastRepository,
  createRepository: function (db) {
    return new CastRepository(db || fflDb);
  }
};
