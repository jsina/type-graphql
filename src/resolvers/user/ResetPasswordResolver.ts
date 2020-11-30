import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entities";
import { ResetPasswordInput } from "./resetPassword";
import { FORGET_PASSWORD_PREFIX } from "../../constants";
import { Context } from "../../types";
import { redis } from "../../redis";

@Resolver()
export class ResetPasswordResolver {
  @Mutation(() => User, { nullable: true })
  async resetPassword(
    @Ctx() context: Context,
    @Arg("input") { token, password }: ResetPasswordInput
  ) {
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return null;
    }
    redis.del(key);
    const user = await User.findOne(userId);
    if (!user) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    context.req.session.uid = user.id;

    return user;
  }
}
