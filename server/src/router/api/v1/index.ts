import { Router } from "express";

import { auth } from "./auth";

export function v1(): Router {
  const v1Router = Router();

  v1Router.use("/auth", auth());

  return v1Router;
}
