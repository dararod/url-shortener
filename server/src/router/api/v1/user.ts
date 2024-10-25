import { Router } from "express";

import { openMongoDBConn } from "../../../infra/mongo";
import { UserModel } from "../../../model/UserModel";
import { verifyToken } from "../../../utils/auth";

export function user(): Router {
  const router = Router();

  router.put("/update", async (req, res) => {
    try {
      await openMongoDBConn();
      const reqBody = req.body;
      const user = await verifyToken(req);
      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        {
          $set: {
            name: reqBody.name,
            surname: reqBody.surname,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedUser)
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  });

  return router;
}
