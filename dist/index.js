

Object.defineProperty(exports, '__esModule', {
  value: true
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _morgan = require('morgan');

const _morgan2 = _interopRequireDefault(_morgan);

const _cors = require('cors');

const _cors2 = _interopRequireDefault(_cors);

const _swaggerUiExpress = require('swagger-ui-express');

const _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

const _bodyParser = require('body-parser');

const _bodyParser2 = _interopRequireDefault(_bodyParser);

const _expressFileupload = require('express-fileupload');

const _expressFileupload2 = _interopRequireDefault(_expressFileupload);

require('dotenv/config');

const _swagger = require('./swagger.json');

const _swagger2 = _interopRequireDefault(_swagger);

const _routes = require('./server/routes');

const _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
const port = process.env.PORT || 8000;

app.use((0, _expressFileupload2.default)());
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)());
app.use('/api/v1', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));
app.use('/api/v1', _routes2.default);

app.listen(port);

exports.default = app;
// # sourceMappingURL=index.js.map
