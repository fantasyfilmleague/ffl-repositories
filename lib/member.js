'use strict';

var util = require('util');
var fflDb = require('ffl-db');
var moment = require('moment');
var sql = require('sql-bricks-postgres');
var Repository = require('./repository').Repository;

function MemberRepository(db) {
  var me = this;
  Repository.call(me, db);
}

util.inherits(MemberRepository, Repository);

MemberRepository.prototype.create = function (userId, leagueId, isCommissioner, callback) {
  var me = this;

  var query = sql.insert('members', {
    user_id: userId,
    league_id: leagueId,
    is_commissioner: isCommissioner,
    created_at: moment.utc().toISOString()
  }).returning('id', 'user_id', 'league_id', 'is_commissioner', 'created_at');

  return me.db.queryOne(query, callback);
};

module.exports = {
  Repository: MemberRepository,
  createRepository: function (db) {
    return new MemberRepository(db || fflDb);
  }
};
