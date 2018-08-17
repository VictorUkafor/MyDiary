import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import {} from 'dotenv/config';
import swaggerDocument from './swagger.json';
import apiRouter from './server/routes';

const app = express();
const port = process.env.PORT;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
if(!module.parent){ app.listen(port); }

export default app;
