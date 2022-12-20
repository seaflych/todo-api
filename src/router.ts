import { Handler, Router } from "express";

export const router = Router();

// Tasks
const handler: Handler = (req, res) => {};

router.get("/task", handler);

router.get("/task/:id", handler);

router.post("/task", handler);

router.put("/task", handler);

router.delete("/task/:id", handler);
