import express from 'express';

import config from './config';

async function serve(): Promise<void> {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(config.port, config.host, () => {
    const { host, port } = config;
    const addrs = `http://${host}:${port}`;

    console.log(`Example app listening on ${addrs}`);
  });
}

serve();
