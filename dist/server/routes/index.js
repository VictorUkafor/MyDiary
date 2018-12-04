'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

require('dotenv/config');

var _queries = require('../models/queries');

var _queries2 = _interopRequireDefault(_queries);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _entries = require('../controllers/entries');

var _entries2 = _interopRequireDefault(_entries);

var _databaseMiddlewares = require('../middlewares/database-middlewares');

var _databaseMiddlewares2 = _interopRequireDefault(_databaseMiddlewares);

var _userMiddlewares = require('../middlewares/user-middlewares');

var _userMiddlewares2 = _interopRequireDefault(_userMiddlewares);

var _entryMiddlewares = require('../middlewares/entry-middlewares');

var _entryMiddlewares2 = _interopRequireDefault(_entryMiddlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _process = process,
    env = _process.env;

var apiRouter = _express2['default'].Router();
var user = new _users2['default'](_jsonwebtoken2['default'], _bcrypt2['default'], env, _queries2['default']);
var entry = new _entries2['default'](_queries2['default']);
var databaseMiddleware = new _databaseMiddlewares2['default'](_pg2['default'], env);
var userMiddleware = new _userMiddlewares2['default'](_jsonwebtoken2['default'], env, _queries2['default']);
var entryMiddleware = new _entryMiddlewares2['default'](_queries2['default']);

apiRouter.get('/', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to MyDiary app!'
  });
});

apiRouter.post('/auth/signup', userMiddleware.checksForSignUpRequiredFields, userMiddleware.checksIfPhotoIsUploaded, databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserAlreadyExist, user.postUser);

apiRouter.post('/auth/login', userMiddleware.checksForLogInRequiredFields, databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserExist, user.loginUser);

apiRouter.get('/user', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, user.getAUser);

apiRouter.get('/entries', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entry.getAllEntries);

apiRouter.post('/entries/search', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entry.searchEntries);

apiRouter.get('/entries/:entryId', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entryMiddleware.checksIfEntryExist, entry.getEntry);

apiRouter.post('/entries', databaseMiddleware.handlesConnectionToTheDatabase, entryMiddleware.checksForAddEntryRequiredFields, userMiddleware.checksIfUserIsAuthenticated, entry.postEntry);

apiRouter.put('/entries/:entryId', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entryMiddleware.checksIfEntryExist, entryMiddleware.checksIfEntryCanBeUpdated, entry.putEntry);

apiRouter['delete']('/entries/:entryId', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entryMiddleware.checksIfEntryExist, entry.deleteEntry);

exports['default'] = apiRouter;
//# sourceMappingURL=index.js.map