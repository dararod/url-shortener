import { Router } from "express";

import { vault } from "./vault";

export function v1(): Router {
  const v1Router = Router();
  const vaultRouter = vault();

  v1Router.use("/vault", vaultRouter);

  return v1Router;
}
