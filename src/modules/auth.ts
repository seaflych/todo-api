import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { IUser, IMiddleWare } from "../types";

export const createJWT = (user: IUser) => {
  if (process.env.JWT_SECRET) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    return token;
  } else {
    // Todo, do we throw ?
    throw new Error("JWT_SECRET must be defined");
  }
};

export const protect: IMiddleWare = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IUser;
    req.user = payload;
    next();
    return;
  } catch (e) {
    console.log(e);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};

export const comparePassword = (password: string | Buffer, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};
