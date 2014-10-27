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

LeagueRepository.prototype.findById = function (id, callback) {
  var me = this;

  var query = sql.select('leagues.*', 'users.email')
    .from('leagues')
    .join('users', {'leagues.commissioner_id': 'users.id'});

  me.db.queryOne(query, callback);
};

LeagueRepository.prototype.create = function (name, callback) {
  var me = this;

  var query = sql.insert('leagues', {
    name: name,
    created_at: moment().utc().toISOString()
  }).returning('id', 'name', 'created_at');

  me.db.queryOne(query, callback);
};

module.exports = {
  Repository: LeagueRepository,
  createRepository: function (db) {
    return new LeagueRepository(db || fflDb);
  }
};
