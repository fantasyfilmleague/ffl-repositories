'use strict';

var util = require('util');
var fflDb = require('ffl-db');
var moment = require('moment');
var sql = require('sql-bricks-postgres');
var Repository = require('./repository').Repository;

function UserRepository(db) {
  var me = this;
  Repository.call(me, db);
}

util.inherits(UserRepository, Repository);

UserRepository.prototype.create = function (email, password, callback) {
  var me = this;

  var query = sql.insert('users', {
    email: email,
    password: password,
    created_at: moment().utc().toISOString()
  }).returning('id', 'email', 'is_verified', 'created_at');

  return me.db.queryOne(query, callback);
};

UserRepository.prototype.findByEmail = function (email, callback) {
  var me = this;

  var query = sql.select('*')
    .from('users')
    .where('email', email);

  return me.db.queryOne(query, callback);
};

module.exports = {
  Repository: UserRepository,
  createRepository: function (db) {
    return new UserRepository(db || fflDb);
  }
};
