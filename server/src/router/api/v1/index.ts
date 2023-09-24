import { Router } from "express";

import { slot } from "./slot";

export function v1(): Router {
  const v1Router = Router();
  const slotRouter = slot();

  v1Router.use("/slots", slotRouter);

  return v1Router;
}
