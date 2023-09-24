import express from 'express';

import config from './config';
import { router } from './router';

async function serve(): Promise<void> {
  const app = express();
  const routes = router();

  app.use(express.json());
  app.use(routes);

  app.listen(config.port, config.host, () => {
    const { host, port } = config;
    const addrs = `http://${host}:${port}`;

    console.log(`Example app listening on ${addrs}`);
  });
}

serve();
