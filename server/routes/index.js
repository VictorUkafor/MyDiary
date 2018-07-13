import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to MyDiary app!',
  }));


export default apiRouter; 