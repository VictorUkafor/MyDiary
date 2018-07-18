import express from 'express';
import uuid from 'uuid';
import data from '../dummy_data';
import UserController from '../controllers/users';
import EntryController from '../controllers/entries';
import AuthController from '../middlewares';

const apiRouter = express.Router();
const auth = new AuthController(data);
const user = new UserController(uuid, data);
const entry = new EntryController(uuid, data);

apiRouter.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to MyDiary app!',
}));


apiRouter.post(
  '/signup',
  auth.checksForSignUpRequiredFields,
  auth.checksIfUserAlreadyExist,
  user.postUser
);

apiRouter.post(
  '/login',
  auth.checksForLogInRequiredFields,
  auth.checksIfUserExist,
  user.loginUser
);

apiRouter.get(
  '/entries',
  entry.getAllEntries
);

apiRouter.get(
  '/entries/:entryId',
  entry.getEntry
);

apiRouter.post(
  '/entries',
  entry.postEntry
);

apiRouter.put(
  '/entries/:entryId',
  entry.putEntry
);

apiRouter.delete(
  '/entries/:entryId',
  entry.deleteEntry
);


export default apiRouter;
