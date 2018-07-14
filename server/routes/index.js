import express from 'express';
import uuid from 'uuid';
import data from '../dummy_data';
import UserController from '../controllers/users';

const apiRouter = express.Router();
const user = new UserController(data, uuid);

apiRouter.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to MyDiary app!',
}));


apiRouter.post('/signup', user.addUser);



export default apiRouter;
