

const _pg = require('pg');

const _pg2 = _interopRequireDefault(_pg);

require('dotenv/config');

const _queries = require('../queries');

const _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_queries2.default.schema(process.env.DATABASE_DEV_URL, _pg2.default);
// schema(process.env.DATABASE_TEST_URL, pg);
// schema(process.env.DATABASE_PRO_URL, pg);
// # sourceMappingURL=index.js.map
