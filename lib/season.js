'use strict';

var util = require('util');
var fflDb = require('ffl-db');
var moment = require('moment');
var sql = require('sql-bricks-postgres');
var Repository = require('./repository').Repository;

function SeasonRepository(db) {
  var me = this;
  Repository.call(me, db);
}

util.inherits(SeasonRepository, Repository);

SeasonRepository.prototype.create = function (leagueId, startDate, endDate, callback) {
  var me = this;

  var query = sql.insert('seasons', {
    league_id: leagueId,
    starts_at: startDate.toISOString(),
    ends_at: endDate.toISOString()
  }).returning('id', 'league_id', 'starts_at', 'ends_at', 'created_at');

  return me.db.queryOne(query, callback);
};

module.exports = {
  Repository: SeasonRepository,
  createRepository: function (db) {
    return new SeasonRepository(db || fflDb);
  }
};
