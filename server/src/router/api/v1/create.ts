import { Router } from "express";
import { MongoError } from "mongodb";

import { openMongoDBConn } from "../../../infra/mongo";
import { UrlModel } from "../../../model/URLModel";

const DUPLICATED_KEY_ERROR_CODE = 11000;

export function create(): Router {
  const router = Router();

  router.post("/link", async (req, res) => {
    try {
      await openMongoDBConn();

      const reqBody = req.body;

      if (!reqBody.fullUrl) {
        res.status(400).json({ message: "full URL is required" });
        return;
      }

      const entry = new UrlModel({
        fullUrl: reqBody.fullUrl,
        shortUrl: reqBody.shortUrl,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });


      const document = await entry.save();

      return res.status(200).json({
        id: document._id,
        fullUrl: document.fullUrl,
        shortUrl: document.shortUrl,
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

  return router;
}
