import { Router } from "express";

import { v1 } from "./v1";

export function api(): Router {
  const apiRouter = Router();

  apiRouter.use("/v1", v1());

  return apiRouter;
}
