import Fastify from "fastify";

import config from "../config";

import type { FastifyInstance } from 'fastify'; 

export class Server {
  private inner: FastifyInstance;

  constructor() {
    this.inner = Fastify({
      logger: true,
    });

    Server.bootstrap(this.inner);
  }

  private static bootstrap(inner: FastifyInstance): void {
    inner.get("/", function (request, reply) {
      reply.send({ hello: "world" });
    });
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
