import express from 'express';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import bcrypt from 'bcrypt';
import key from '../models/key';
import UserController from '../controllers/users';
import EntryController from '../controllers/entries';
import UserMidddleware from '../middlewares/user-middlewares';
import AuthController from '../middlewares';

const apiRouter = express.Router();
const auth = new AuthController(jwt, pg, key);
const userMiddleware = new UserMidddleware(jwt, bcrypt, key);
const user = new UserController(jwt, bcrypt, key);
const entry = new EntryController();

apiRouter.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to MyDiary app!',
}));


apiRouter.post(
  '/auth/signup',
  userMiddleware.checksForSignUpRequiredFields,
  auth.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserAlreadyExist,
  user.postUser
);

apiRouter.post(
  '/auth/login',
  userMiddleware.checksForLogInRequiredFields,
  auth.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserExist,
  user.loginUser
);

apiRouter.get(
  '/entries',
  auth.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  entry.getAllEntries
);

apiRouter.get(
  '/entries/:entryId',
  auth.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  auth.checksIfEntryExist,
  entry.getEntry
);

apiRouter.post(
  '/entries',
  auth.handlesConnectionToTheDatabase,
  auth.checksForAddEntryRequiredFields,
  userMiddleware.checksIfUserIsAuthenticated,
  entry.postEntry
);

apiRouter.put(
  '/entries/:entryId',
  auth.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  auth.checksIfEntryExist,
  auth.checksIfEntryCanBeUpdated,
  entry.putEntry
);

apiRouter.delete(
  '/entries/:entryId',
  auth.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  auth.checksIfEntryExist,
  entry.deleteEntry
);


export default apiRouter;
