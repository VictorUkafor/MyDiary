import express from 'express';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import bcrypt from 'bcrypt';
import key from '../models/key';
import UserController from '../controllers/users';
import EntryController from '../controllers/entries';
import DatabaseMiddleware from '../middlewares/database-middleware';
import UserMidddleware from '../middlewares/user-middlewares';
import AuthController from '../middlewares';

const apiRouter = express.Router();
const auth = new AuthController(jwt, pg, key);
const databaseMiddleware = new DatabaseMiddleware(pg);
const userMiddleware = new UserMidddleware(jwt, key);
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
  '/entries',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  entry.getAllEntries
);

apiRouter.get(
  '/entries/:entryId',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  auth.checksIfEntryExist,
  entry.getEntry
);

apiRouter.post(
  '/entries',
  databaseMiddleware.handlesConnectionToTheDatabase,
  auth.checksForAddEntryRequiredFields,
  userMiddleware.checksIfUserIsAuthenticated,
  entry.postEntry
);

apiRouter.put(
  '/entries/:entryId',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  auth.checksIfEntryExist,
  auth.checksIfEntryCanBeUpdated,
  entry.putEntry
);

apiRouter.delete(
  '/entries/:entryId',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  auth.checksIfEntryExist,
  entry.deleteEntry
);


export default apiRouter;
