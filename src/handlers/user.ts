import { Request, Response } from "express";
import { prisma } from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const signUp = async (req: Request, res: Response) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  const isValid = user
    ? await comparePasswords(req.body.password, user.password)
    : false;

  if (!isValid || !user) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
