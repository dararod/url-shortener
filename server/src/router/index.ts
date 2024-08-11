import { Express, Router } from "express";

import { api } from "./api";

export function router(): Router {
  const applicationRouter = Router();

  applicationRouter.use("/api", api());

  return applicationRouter;
}
