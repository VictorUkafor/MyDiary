import express from 'express';
import uuid from 'uuid';
import bcrypt from 'bcrypt';
import data from '../dummy_data';
import UserController from '../controllers/users';
import AuthController from '../middlewares';

const apiRouter = express.Router();
const auth = new AuthController(data);
const user = new UserController(data, uuid, bcrypt);

apiRouter.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to MyDiary app!',
}));


apiRouter.post(
  '/signup',
  auth.checksForUserRequiredFields,
  auth.checksIfUserAlreadyExist,
  user.postUser
);


export default apiRouter;
