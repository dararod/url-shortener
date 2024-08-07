import { Router } from "express";

import { v1 } from "./v1";

export function api(): Router {
  const apiRouter = Router();
  const v1Routes = v1();

  apiRouter.use("/v1", v1Routes);

  return apiRouter;
}
