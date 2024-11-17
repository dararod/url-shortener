import fp from 'fastify-plugin';

import { apiV1AuthRouterPlugin } from './auth';

import type { FastifyInstance } from "fastify";

export const apiV1RouterPlugin = fp((
  fastify: FastifyInstance,
  _,
  done,
) => {
  fastify.register(apiV1AuthRouterPlugin, {
    prefix: '/api/v1/auth',
  });

  done();
}, {
  name: 'api-v1-router',
  dependencies: ['services'],
});
