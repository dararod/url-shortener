import fp from 'fastify-plugin';

import { apiV1AuthRouterPlugin } from './auth';
import { apiV1UserRouterPlugin } from './user';

import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { Services } from '../../../../services';
import { apiV1LinkRouterPlugin } from './link';

export const makeAuthHook = (services: Services) => async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
  const auth = request.headers.authorization;

  if (!auth) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }

  const [scheme, accessToken] = auth.split(' ');

  if (scheme.toLowerCase() !== 'bearer') {
    return reply.status(401).send({ message: 'Unauthorized' });
  }

  const maybeUser = await services.userService.getByAccessToken(accessToken);

  if (maybeUser) {
    // https://fastify.dev/docs/latest/Reference/Hooks/#using-hooks-to-inject-custom-properties
    request.user = maybeUser;
  }
};

export const apiV1RouterPlugin = fp((
  fastify: FastifyInstance,
  _,
  done,
) => {
  fastify.register(apiV1AuthRouterPlugin, {
    prefix: '/api/v1/auth',
  });

  fastify.register(apiV1UserRouterPlugin, {
    prefix: '/api/v1/user',
  });

  fastify.register(apiV1LinkRouterPlugin, {
    prefix: '/api/v1/links',
  })

  done();
}, {
  name: 'api-v1-router',
  dependencies: ['services'],
});
