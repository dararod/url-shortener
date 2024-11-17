import fp from 'fastify-plugin';

import type { FastifyInstance, FastifyPluginCallback } from "fastify";
import type { RegisterUserDto } from "../../../../../domain/user/UserService";

export const apiV1AuthRouterPlugin: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _,
  done,
) => {
  fastify.post("/signup", async function (request, reply) {
    try {
      const reqBody = request.body as RegisterUserDto;

      if (!reqBody.email) {
        reply.status(400).send({ message: "Email is required" });
        return;
      }

      const user = await this.services.userService.register({
        name: reqBody.name,
        surname: reqBody.surname,
        email: reqBody.email,
        password: reqBody.password,
      });

      if (!user) {
        reply.status(500).send({ message: "Failed to create user" });
        return;
      }

      const accessToken =
        await this.services.userService.generateAccessToken(user);

      return reply.status(201).send({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        accessToken,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      return reply.status(500).send({ message: (err as Error).message });
    }
  });

  done();
};
