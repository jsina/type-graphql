import { MiddlewareFn } from "type-graphql";
import { Context, Roles } from "../../types";

export const IsAuth = (role: Roles): MiddlewareFn<Context> => {
  return async ({ context }, next) => {
    const result = await next();
    if (!context.req.session.uid) {
      throw new Error("Access denied!");
    }
    if (role !== Roles.ADMIN) {
      throw new Error("Your do not have a role for this action!");
    }
    return result;
  };
};
