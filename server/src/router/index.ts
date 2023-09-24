import { Express, Router } from "express";

import { api } from "./api";

export function router(): Router {
  const applicationRouter = Router();
  const apiRouter = api();

  applicationRouter.use("/api", apiRouter);

  return applicationRouter;
}
