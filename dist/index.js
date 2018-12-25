'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

require('dotenv/config');

var _swagger = require('./swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

var _routes = require('./server/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var app = (0, _express2['default'])();
var port = process.env.PORT;

app.use((0, _expressFileupload2['default'])());
app.use((0, _morgan2['default'])('dev'));

app.use(_bodyParser2['default'].json());
app.use(_bodyParser2['default'].urlencoded({ extended: true }));
app.use((0, _cors2['default'])());
app.use('/api/v1', _routes2['default']);
app.use('/api-docs', _swaggerUiExpress2['default'].serve, _swaggerUiExpress2['default'].setup(_swagger2['default']));

app.listen(port);

exports['default'] = app;
//# sourceMappingURL=index.js.map