import { Request } from "express";
import session from "express-session";

type MySessionRequest = Request & {
  session: session.Session &
    Partial<session.SessionData> & {
      uid: number;
    };
};
export interface Context {
  req: MySessionRequest;
}
