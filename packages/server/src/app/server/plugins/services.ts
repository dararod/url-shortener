import fp from 'fastify-plugin';

import { Services } from "../../services";

import type { FastifyInstance, FastifyPluginCallback } from "fastify";
import type { Database } from "../../../infra/repository";

export type ServicesOptions = {
  database: Database;
}

export const servicesPlugin = fp<ServicesOptions>((
  fastify: FastifyInstance,
  opts,
  done,
) => {
  const services = new Services(opts.database);
  fastify.decorate('services', services);
  done();
}, {
  name: 'services',
});
