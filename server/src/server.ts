import express from 'express';
import dotEnv from 'dotenv'

import config from './config';
import { router } from './router';
import cookieParser from 'cookie-parser';
async function serve(): Promise<void> {
  dotEnv.config();
  const app = express();
  const routes = router();

  app.use(cookieParser());
  app.use(express.json());
  app.use(routes);

  app.listen(config.port, config.host, () => {
    const { host, port } = config;
    const addrs = `http://${host}:${port}`;

    console.log(`Example app listening on ${addrs}`);
  });
}

serve();
