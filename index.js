import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import {} from 'dotenv/config';
import swaggerDocument from './swagger.json';
import apiRouter from './server/routes';

const app = express();
const port = process.env.PORT;

app.use(fileUpload());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port);

export default app;
