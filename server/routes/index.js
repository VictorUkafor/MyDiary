import express from 'express';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import bcrypt from 'bcrypt';
import key from '../models/key';
import UserController from '../controllers/users';
import EntryController from '../controllers/entries';
import AuthController from '../middlewares';

const apiRouter = express.Router();
const auth = new AuthController(jwt, pg, key);
const user = new UserController(jwt, bcrypt, key);
const entry = new EntryController();

apiRouter.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to MyDiary app!',
}));


apiRouter.post(
  '/auth/signup',
  auth.checksForSignUpRequiredFields,
  auth.handlesConnectionToTheDatabase,
  auth.checksIfUserAlreadyExist,
  user.postUser
);

apiRouter.post(
  '/auth/login',
  auth.checksForLogInRequiredFields,
  auth.handlesConnectionToTheDatabase,
  auth.checksIfUserExist,
  user.loginUser
);

apiRouter.get(
  '/entries',
  auth.handlesConnectionToTheDatabase,
  auth.checksIfUserIsAuthenticated,
  entry.getAllEntries
);

apiRouter.get(
  '/entries/:entryId',
  auth.handlesConnectionToTheDatabase,
  auth.checksIfUserIsAuthenticated,
  auth.checksIfEntryExist,
  entry.getEntry
);

apiRouter.post(
  '/entries',
  auth.handlesConnectionToTheDatabase,
  auth.checksForAddEntryRequiredFields,
  auth.checksIfUserIsAuthenticated,
  entry.postEntry
);

apiRouter.put(
  '/entries/:entryId',
  auth.handlesConnectionToTheDatabase,
  auth.checksIfUserIsAuthenticated,
  auth.checksIfEntryExist,
  entry.putEntry
);

apiRouter.delete(
  '/entries/:entryId',
  auth.handlesConnectionToTheDatabase,
  auth.checksIfUserIsAuthenticated,
  auth.checksIfEntryExist,
  entry.deleteEntry
);


export default apiRouter;
