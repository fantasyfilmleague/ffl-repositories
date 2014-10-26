'use strict';

var util = require('util');
var fflDb = require('ffl-db');
var moment = require('moment');
var sql = require('sql-bricks-postgres');
var Repository = require('./repository').Repository;

function LeagueRepository(db) {
  var me = this;
  Repository.call(me, db);
}

util.inherits(LeagueRepository, Repository);

LeagueRepository.prototype.create = function (commissionerId, name, callback) {
  var me = this;

  var query = sql.insert('leagues', {
    commissioner_id: commissionerId,
    name: name,
    created_at: moment().utc().toISOString()
  }).returning('id', 'commissioner_id', 'name', 'created_at');

  return me.db.queryOne(query, callback);
};

module.exports = {
  Repository: LeagueRepository,
  createRepository: function (db) {
    return new LeagueRepository(db || fflDb);
  }
};
