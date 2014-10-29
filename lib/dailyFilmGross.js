'use strict';

var util = require('util');
var fflDb = require('ffl-db');
var moment = require('moment');
var sql = require('sql-bricks-postgres');
var Repository = require('./repository').Repository;

function DailyFilmGrossRepository(db) {
  var me = this;
  Repository.call(me, db);
}

util.inherits(DailyFilmGrossRepository, Repository);

DailyFilmGrossRepository.prototype.findByFilmId = function (filmId, callback) {
  var me = this;
  me.findByFilmIds([filmId], callback);
};

DailyFilmGrossRepository.prototype.findByFilmIds = function (filmIds, callback) {
  var me = this;

  var query = sql.select('*')
    .from('daily_film_grosses')
    .where(sql.$in('film_id', filmIds))
    .orderBy('date_at');

  me.db.query(query, callback);
};

DailyFilmGrossRepository.prototype.create = function (filmId, gross, date, callback) {
  var me = this;

  var query = sql.insert('daily_film_grosses', {
    film_id: filmId,
    gross: gross,
    date_at: date.toISOString(),
    created_at: moment.utc().toISOString()
  }).returning('id', 'film_id', 'gross', 'date_at', 'created_at');

  me.db.queryOne(query, callback);
};

module.exports = {
  Repository: DailyFilmGrossRepository,
  createRepository: function (db) {
    return new DailyFilmGrossRepository(db || fflDb);
  }
};
