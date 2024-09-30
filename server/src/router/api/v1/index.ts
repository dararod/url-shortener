import { Router } from "express";

import { auth } from "./auth";
import { create } from "./create";

export function v1(): Router {
  const v1Router = Router();

  v1Router.use("/auth", auth());
  v1Router.use("/create", create());

  return v1Router;
}
