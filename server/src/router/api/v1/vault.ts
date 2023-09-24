import { Router } from "express";

export function vault(): Router {
  const vaultRouter = Router();

  vaultRouter.get("/", (req, res) => {
    res.send("Hello from vault!");
  });

  return vaultRouter;
}
