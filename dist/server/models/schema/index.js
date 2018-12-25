'use strict';

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

require('dotenv/config');

var _queries = require('../queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_queries2['default'].schema(process.env.DATABASE_DEV_URL, _pg2['default']);
_queries2['default'].schema(process.env.DATABASE_TEST_URL, _pg2['default']);
_queries2['default'].schema(process.env.DATABASE_PRO_URL, _pg2['default']);
//# sourceMappingURL=index.js.map