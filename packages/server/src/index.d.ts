import 'fastify';

import type { Services } from './app/services';

declare module 'fastify' {
  interface FastifyInstance {
    services: Services;
  }
}
