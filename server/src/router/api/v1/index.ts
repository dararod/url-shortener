import { Router } from "express";

import { auth } from "./auth";
import { links } from "./links";

export function v1(): Router {
  const v1Router = Router();

  v1Router.use("/auth", auth());
  v1Router.use("/links", links());

  return v1Router;
}
