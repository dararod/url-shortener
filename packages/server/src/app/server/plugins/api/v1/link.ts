import { makeAuthHook } from "./router";

import type { FastifyInstance, FastifyPluginCallback } from "fastify";
import type { CreateLinkDto } from "../../../../../domain/link/LinkService";
import type { ObjectId } from "mongodb";

export type CreateLinkRequestBody = {
  fullUrl: string;
  slug: string;
  userId: string;
};

export type UpdateLinkRequestBody = {
  fullUrl: string;
  slug: string;
  activated: boolean;
};

export const apiV1LinkRouterPlugin: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _,
  done
) => {
  fastify
    .post("/", async function (request, reply) {
      try {
        if (!request.user) {
          return reply.status(401).send({ message: "Unauthorized" });
        }

        const reqBody = request.body as CreateLinkDto;
        const link = await this.services.linkService.create({
          fullUrl: reqBody.fullUrl,
          slug: reqBody.slug,
          userId: request.user.id,
        });

        
      if (!link) {
        reply.status(500).send({ message: "Failed to create link" });
        return;
      }
        console.log(link.id);
        return reply.status(201).send({
          id: link.id,
          fullUrl: link.fullUrl,
          slug: link.slug,
          activated: link.activated,
          userId: request.user.id,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
        });
      } catch (err) {
        return reply.status(500).send({ message: (err as Error).message });
      }
    })
    .addHook('onRequest', makeAuthHook(fastify.services));

  fastify.get("/:slug", async function (request, reply) {
    try {
      const linkSlug = request.params.slug;
      const link = await this.services.linkService.getBySlug(linkSlug);
      if (!link) {
        return reply.status(400).send({ message: "Link was not found" });
      }
      
      return reply.status(200).send(link);
    } catch (err) {
      return reply.status(500).send({ message: (err as Error).message });
    }
  });

  fastify.put("/:slug", async function (request, reply) {
    try {
      const reqBody = request.body as UpdateLinkRequestBody;
      const link = await this.services.linkService.getBySlug(request.params.slug);

      if (!link) {
        return reply.status(400).send({ message: "Link's slug was not found" });
      }
      console.log(link._id);
      const nextlink = await this.services.linkService.updateLinkDetails(link._id, reqBody);
      console.log(nextlink);
      if (!nextlink) {
        return reply.status(400).send({ message: "Link was not found" });
      }
      
      return reply.status(200).send(nextlink);
    } catch (err) {
      return reply.status(500).send({ message: (err as Error).message });
    }
  }).addHook('onRequest', makeAuthHook(fastify.services));;

  done();
};
