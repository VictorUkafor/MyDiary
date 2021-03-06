import express from 'express';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import bcrypt from 'bcrypt';
import {} from 'dotenv/config';
import queries from '../models/queries';
import UserController from '../controllers/users';
import EntryController from '../controllers/entries';
import DatabaseMiddleware from '../middlewares/database-middlewares';
import UserMidddleware from '../middlewares/user-middlewares';
import EntryMiddleware from '../middlewares/entry-middlewares';

const { env } = process;
const apiRouter = express.Router();
const user = new UserController(jwt, bcrypt, env, queries);
const entry = new EntryController(queries);
const databaseMiddleware = new DatabaseMiddleware(pg, env);
const userMiddleware = new UserMidddleware(jwt, env, queries);
const entryMiddleware = new EntryMiddleware(queries);


apiRouter.post(
  '/auth/signup',
  userMiddleware.checksForSignUpRequiredFields,
  userMiddleware.checksIfPhotoIsUploaded,
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
  EntryController.getEntry
);

apiRouter.post(
  '/entries',
  databaseMiddleware.handlesConnectionToTheDatabase,
  EntryMiddleware.checksForAddEntryRequiredFields,
  userMiddleware.checksIfUserIsAuthenticated,
  entry.postEntry
);

apiRouter.put(
  '/entries/:entryId',
  databaseMiddleware.handlesConnectionToTheDatabase,
  userMiddleware.checksIfUserIsAuthenticated,
  entryMiddleware.checksIfEntryExist,
  EntryMiddleware.checksIfEntryCanBeUpdated,
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
