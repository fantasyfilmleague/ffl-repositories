'use strict';

var fflDb = require('db');

function Repository(db) {
  this.db = db;
}

module.exports = {
  Repository: Repository,
  createRepository: function (db) {
    return new Repository(db || fflDb);
  }
};
