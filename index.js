'use strict';

var path = require('path');
var libPath = path.join(__dirname, './lib');

require('ffl-utils').requireByDir(__filename, libPath, exports);
