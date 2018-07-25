import express from 'express';
import UserController from '../controllers/users';
//import EntryController from '../controllers/entries';
import AuthController from '../middlewares';

const apiRouter = express.Router();
const auth = new AuthController();
const user = new UserController();
//const entry = new EntryController();

apiRouter.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to MyDiary app!',
}));


apiRouter.post(
  '/auth/signup',
  auth.checksForSignUpRequiredFields,
  auth.checksIfUserAlreadyExist,
  user.postUser
);

// apiRouter.post(
//   '/login',
//   auth.checksForLogInRequiredFields,
//   auth.checksIfUserExist,
//   user.loginUser
// );

// apiRouter.get(
//   '/entries',
//   entry.getAllEntries
// );

// apiRouter.get(
//   '/entries/:entryId',
//   entry.getEntry
// );

// apiRouter.post(
//   '/entries',
//   entry.postEntry
// );

// apiRouter.put(
//   '/entries/:entryId',
//   entry.putEntry
// );

// apiRouter.delete(
//   '/entries/:entryId',
//   entry.deleteEntry
// );


export default apiRouter;
