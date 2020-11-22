import { AuthChecker } from "type-graphql";
import { Context } from "./types";

export const authChecker: AuthChecker<Context> = ({ context }) => {
  return !!context.req.session.uid;
};
