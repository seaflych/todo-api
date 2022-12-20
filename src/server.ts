import express from "express";
import { router } from "./router";

export const app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "test" });
});

app.use("api", router);
