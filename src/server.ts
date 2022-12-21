import express from "express";
import morgan from "morgan";
import { signIn, signUp } from "./handlers/user";
import { protect } from "./modules/auth";
import { router } from "./router";

export const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "test" });
});

app.get("/signup", signUp);

app.get("/signin", signIn);

app.use("api", protect, router);
