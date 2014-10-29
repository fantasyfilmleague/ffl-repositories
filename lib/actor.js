'use strict';

var util = require('util');
var fflDb = require('ffl-db');
var moment = require('moment');
var sql = require('sql-bricks-postgres');
var Repository = require('./repository').Repository;

function ActorRepository(db) {
  var me = this;
  Repository.call(me, db);
}

util.inherits(ActorRepository, Repository);

ActorRepository.prototype.findByName = function (name, callback) {
  var me = this;

  var query = sql.select('*')
    .from('actors')
    .where('name', name);

  me.db.queryOne(query, callback);
};

ActorRepository.prototype.create = function (name, callback) {
  var me = this;

  var query = sql.insert('actors', {
    name: name,
    created_at: moment.utc().toISOString()
  }).returning('id', 'name', 'created_at');

  me.db.queryOne(query, callback);
};

module.exports = {
  Repository: ActorRepository,
  createRepository: function (db) {
    return new ActorRepository(db || fflDb);
  }
};
