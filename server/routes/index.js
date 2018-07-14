import express from 'express';
import uuid from 'uuid';
import UserController from '../controllers/users';
import AuthController from '../middlewares';

const apiRouter = express.Router();
const auth = new AuthController();
const user = new UserController(uuid);

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


export default apiRouter;
