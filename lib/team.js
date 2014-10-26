'use strict';

var util = require('util');
var fflDb = require('ffl-db');
var moment = require('moment');
var sql = require('sql-bricks-postgres');
var Repository = require('./repository').Repository;

function TeamRepository(db) {
  var me = this;
  Repository.call(me, db);
}

util.inherits(TeamRepository, Repository);

TeamRepository.prototype.create = function (ownerId, seasonId, name, callback) {
  var me = this;

  var query = sql.insert('teams', {
    owner_id: ownerId,
    seasonId: seasonId,
    name: name,
    created_at: moment.utc().toISOString()
  }).returning('id', 'owner_id', 'season_id', 'name', 'created_at');

  return me.db.queryOne(query, callback);
};

module.exports = {
  Repository: TeamRepository,
  createRepository: function (db) {
    return new TeamRepository(db || fflDb);
  }
};
