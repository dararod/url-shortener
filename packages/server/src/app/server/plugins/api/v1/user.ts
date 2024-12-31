import type { FastifyInstance, FastifyPluginCallback } from "fastify";
import { makeAuthHook } from "./router";

export const apiV1UserRouterPlugin: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _,
  done,
) => {
  const authHook = makeAuthHook(fastify.services);

  fastify.get("/me", async function (request, reply) {
    // FIXME: should not return accessToken nor passwordHash
    return reply.status(200).send(request.user);
  }).addHook('onRequest', authHook);

  done();
};
