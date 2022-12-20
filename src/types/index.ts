import { NextFunction, Request, Response } from "express";

export interface IUser {
  id: string;
  username: string;
}

export interface IMiddleWare {
  (req: Request, res: Response, next: NextFunction): void;
}
