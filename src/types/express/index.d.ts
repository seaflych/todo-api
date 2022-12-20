import { IUser } from "..";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
