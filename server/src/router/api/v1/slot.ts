import { Router } from "express";

type Slot = {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type SlotCreatePayload = {
  username: string;
  password: string;
};

type SlotUpdatePayload = {
  username?: string;
  password?: string;
};

const myDatabase: Map<String, Slot> = new Map();

export function slot(): Router {
  const slotRouter = Router();

  slotRouter.get("/", (_, res) => {
    res.json(Array.from(myDatabase.values()));
  });

  slotRouter.post("/", (req, res) => {
    const payload: SlotCreatePayload = req.body;
    const nextId = myDatabase.size + 1;
    const slot = {
      id: nextId.toString(),
      username: payload.username,
      password: payload.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    myDatabase.set(slot.id, slot);
    res.json(slot);
  });

  slotRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const maybeSlot = myDatabase.get(id);

    if (!maybeSlot) {
      res.status(404).json({ message: "Slot not found" });
      return;
    }

    const payload: SlotUpdatePayload = req.body;

    if (payload.username) {
      maybeSlot.username = payload.username;
    }

    if (payload.password) {
      maybeSlot.password = payload.password;
    }

    if (payload.username || payload.password) {
      maybeSlot.updatedAt = new Date();
    }

    res.json(maybeSlot);
  });

  slotRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const hasSlot = myDatabase.has(id);

    if (hasSlot) {
      myDatabase.delete(id);
      return res.status(204).send();
    }

    res.status(404).json({ message: "Slot not found" });
  });

  return slotRouter;
}
