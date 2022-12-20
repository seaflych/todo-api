import express from "express";

export const app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "test" });
});
