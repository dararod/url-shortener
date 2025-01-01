import Fastify from "fastify";

import config from "../../config";
import { servicesPlugin } from './plugins/services';
import { apiV1RouterPlugin} from './plugins/api/v1/router';
import { makeDatabaseConn, migrate } from "../../infra/repository";

import type { FastifyInstance } from 'fastify';

export class Server {
  private inner: FastifyInstance;

  constructor() {
    this.inner = Fastify({
      logger: true,
    });
  }

  async bootstrap(): Promise<void> {
    const database = await makeDatabaseConn(config.databaseUrl as string);

    await migrate(database);

    await this.inner.register(servicesPlugin, {
      database,
    });
    await this.inner.register(apiV1RouterPlugin);
  }

  public async run(): Promise<void> {
    const { host, port } = config;

    this.inner.listen({ host, port }, (err) => {
      if (err) {
        this.inner.log.error(err);
        process.exit(1);
      }
    });
  }
}
