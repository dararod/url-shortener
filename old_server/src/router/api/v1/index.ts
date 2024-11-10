import { Router } from "express";

import { auth } from "./auth";
import { links } from "./links";
import { user } from "./user";

export function v1(): Router {
  const v1Router = Router();

  v1Router.use("/auth", auth());
  v1Router.use("/links", links());
  v1Router.use("/user", user());

  return v1Router;
}
