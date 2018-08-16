import express from 'express';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import bcrypt from 'bcrypt';
import key from '../models/key';
import UserController from '../controllers/users';
import EntryController from '../controllers/entries';
import DatabaseMiddleware from '../middlewares/database-middlewares';
import UserMidddleware from '../middlewares/user-middlewares';
import EntryMiddleware from '../middlewares/entry-middlewares';

const apiRouter = express.Router();
const databaseMiddleware = new DatabaseMiddleware(pg);
const userMiddleware = new UserMidddleware(jwt, key);
const entryMiddleware = new EntryMiddleware();
const user = new UserController(jwt, bcrypt, key);
const entry = new EntryController();

apiRouter.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to MyDiary app!',
}));


apiRouter.post(
  '/auth/signup',
  userMiddleware.checksForSignUpRequiredFields,
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserAlreadyExist,
  user.postUser
);

apiRouter.post(
  '/auth/login',
  userMiddleware.checksForLogInRequiredFields,
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserExist,
  user.loginUser
);

apiRouter.get(
  '/user',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  user.getAUser
);

apiRouter.get(
  '/entries',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  entry.getAllEntries
);

apiRouter.get(
  '/entries/:entryId',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  entryMiddleware.checksIfEntryExist,
  entry.getEntry
);

apiRouter.post(
  '/entries',
  databaseMiddleware.handlesConnectionToTheDatabase,
  entryMiddleware.checksForAddEntryRequiredFields,
  userMiddleware.checksIfUserIsAuthenticated,
  entry.postEntry
);

apiRouter.put(
  '/entries/:entryId',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  entryMiddleware.checksIfEntryExist,
  entryMiddleware.checksIfEntryCanBeUpdated,
  entry.putEntry
);

apiRouter.delete(
  '/entries/:entryId',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  entryMiddleware.checksIfEntryExist,
  entry.deleteEntry
);


export default apiRouter;
