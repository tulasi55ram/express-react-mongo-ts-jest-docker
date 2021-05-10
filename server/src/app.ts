import bodyParser from 'body-parser';
import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import helmet from "helmet"; 

dotenv.config();
//MongoDB
import connectDB from './config/mongoose';
connectDB();  

// Routes
import statusRouter from './routes/status';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';


const app: express.Express = express();
app.use(helmet());
// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const apiSpec = path.join(__dirname, 'spec.yml');
const specFile = fs.readFileSync(path.resolve(__dirname, 'spec.yml'), 'utf8');
const swaggerDocument = yaml.load(specFile) as OpenAPIV3.Document;
app.use('/spec', express.static(apiSpec));

// validator
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses: true, // <-- to validate responses
  }),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/status', statusRouter);

export default app;
