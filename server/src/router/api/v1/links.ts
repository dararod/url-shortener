import e, { Router } from "express";
import { MongoError } from "mongodb";

import { openMongoDBConn } from "../../../infra/mongo";
import { UrlModel } from "../../../model/URLModel";
import { verifyToken } from "../../../utils/auth";

const DUPLICATED_KEY_ERROR_CODE = 11000;

export function links(): Router {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
      await openMongoDBConn();
      verifyToken(req);

      const reqBody = req.body;

      if (!reqBody.fullUrl) {
        res.status(400).json({ message: "full URL is required" });
        return;
      }

      const entry = new UrlModel({
        fullUrl: reqBody.fullUrl,
        shortUrl: reqBody.shortUrl,
        activatedAt: Date.now(),
        deactivatedAt: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      const document = await entry.save();

      return res.status(201).json({
        id: document._id,
        fullUrl: document.fullUrl,
        shortUrl: document.shortUrl,
        activatedAt: document.activatedAt,
        deactivatedAt: document.deactivatedAt,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      });
    } catch (err) {
      // FIXME: This is exposing internal error which is not good for security
      if ((err as MongoError)?.code === DUPLICATED_KEY_ERROR_CODE) {
        return res.status(400).json({ message: (err as MongoError)?.message });
      }

      return res.status(500).json({ message: (err as Error).message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      await openMongoDBConn();
      verifyToken(req);
      
      const linkId = req.params.id
      const link = await UrlModel.findById(
        linkId
      ).exec();

      if (!link) {
        return res.status(400).json({ message: "Link was not found" });
      }
      
      res.status(200).json(link)
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      await openMongoDBConn();
      const reqBody = req.body;
      verifyToken(req);
      
      const linkId = req.params.id
      const updatedLink = await UrlModel.findByIdAndUpdate(
        linkId,
        {
          $set: {
            fullUrl: reqBody.fullUrl,
            shortUrl: reqBody.shortUrl,
            updatedAt: new Date()
          }
        },
        {new: true}
      );

      res.status(200).json(updatedLink)
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  });

  router.patch("/deactivate/:id", async (req, res) => {
    try {
      await openMongoDBConn();
      verifyToken(req);
      
      const linkId = req.params.id
      const updatedLink = await UrlModel.findByIdAndUpdate(
        linkId,
        {
          $set: {
            deactivatedAt: new Date(),
            updatedAt: new Date()
          }
        },
        {new: true}
      );

      res.status(200).json(updatedLink)
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  });

  router.patch("/activate/:id", async (req, res) => {
    try {
      await openMongoDBConn();
      verifyToken(req);
      
      const linkId = req.params.id
      const updatedLink = await UrlModel.findByIdAndUpdate(
        linkId,
        {
          $set: {
            activatedAt: new Date(),
            updatedAt: new Date()
          }
        },
        {new: true}
      );

      res.status(200).json(updatedLink)
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  });

  return router;
}
