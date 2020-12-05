import { Ctx, Mutation, Resolver } from "type-graphql";

import { Context } from "../../types";
import { SESSION_NAME } from "../../constants";

@Resolver()
export class LogoutReoslver {
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(err);
        }
        res.clearCookie(SESSION_NAME);
        return resolve(true);
      });
    });
  }
}
