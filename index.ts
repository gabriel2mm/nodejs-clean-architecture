import express from 'express';
import bodyParser from 'body-parser';
import {setupRoutes} from './src/main/config/routes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.json());
setupRoutes(app);

app.listen(process.env.PORT || 8080, () => {
  console.log(`⚡️[server]: Rodando no endpoint https://localhost:${process.env.PORT}`);
});