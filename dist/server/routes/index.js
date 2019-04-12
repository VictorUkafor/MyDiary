

Object.defineProperty(exports, '__esModule', {
  value: true
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _jsonwebtoken = require('jsonwebtoken');

const _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const _pg = require('pg');

const _pg2 = _interopRequireDefault(_pg);

const _bcrypt = require('bcrypt');

const _bcrypt2 = _interopRequireDefault(_bcrypt);

require('dotenv/config');

const _queries = require('../models/queries');

const _queries2 = _interopRequireDefault(_queries);

const _users = require('../controllers/users');

const _users2 = _interopRequireDefault(_users);

const _entries = require('../controllers/entries');

const _entries2 = _interopRequireDefault(_entries);

const _databaseMiddlewares = require('../middlewares/database-middlewares');

const _databaseMiddlewares2 = _interopRequireDefault(_databaseMiddlewares);

const _userMiddlewares = require('../middlewares/user-middlewares');

const _userMiddlewares2 = _interopRequireDefault(_userMiddlewares);

const _entryMiddlewares = require('../middlewares/entry-middlewares');

const _entryMiddlewares2 = _interopRequireDefault(_entryMiddlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _process = process,
  env = _process.env;

const apiRouter = _express2.default.Router();
const user = new _users2.default(_jsonwebtoken2.default, _bcrypt2.default, env, _queries2.default);
const entry = new _entries2.default(_queries2.default);
const databaseMiddleware = new _databaseMiddlewares2.default(_pg2.default, env);
const userMiddleware = new _userMiddlewares2.default(_jsonwebtoken2.default, env, _queries2.default);
const entryMiddleware = new _entryMiddlewares2.default(_queries2.default);

apiRouter.post('/auth/signup', userMiddleware.checksForSignUpRequiredFields, userMiddleware.checksIfPhotoIsUploaded, databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserAlreadyExist, user.postUser);

apiRouter.post('/auth/login', userMiddleware.checksForLogInRequiredFields, databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserExist, user.loginUser);

apiRouter.get('/user', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, user.getAUser);

apiRouter.get('/entries', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entry.getAllEntries);

apiRouter.post('/entries/search', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entry.searchEntries);

apiRouter.get('/entries/:entryId', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entryMiddleware.checksIfEntryExist, entry.getEntry);

apiRouter.post('/entries', databaseMiddleware.handlesConnectionToTheDatabase, entryMiddleware.checksForAddEntryRequiredFields, userMiddleware.checksIfUserIsAuthenticated, entry.postEntry);

apiRouter.put('/entries/:entryId', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entryMiddleware.checksIfEntryExist, entryMiddleware.checksIfEntryCanBeUpdated, entry.putEntry);

apiRouter.delete('/entries/:entryId', databaseMiddleware.handlesConnectionToTheDatabase, userMiddleware.checksIfUserIsAuthenticated, entryMiddleware.checksIfEntryExist, entry.deleteEntry);

exports.default = apiRouter;
// # sourceMappingURL=index.js.map
