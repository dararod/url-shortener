import 'fastify';

import type { Services } from './app/services';
import type { UserEntity } from './domain/user/UserEntity';

declare module 'fastify' {
  interface FastifyInstance {
    services: Services;
  }

  // https://fastify.dev/docs/latest/Reference/Hooks/#using-hooks-to-inject-custom-properties
  interface FastifyRequest {
    user: UserEntity | null;
  }
}
