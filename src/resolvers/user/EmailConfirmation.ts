import { Arg, Mutation, Resolver } from "type-graphql";

import { redis } from "../../redis";
import { User } from "../../entities";
import { CONFIRM_EMAIL_PREFIX } from "../../constants";

@Resolver()
export class EmailConfirmation {
  @Mutation(() => Boolean)
  async emailConfirmation(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(CONFIRM_EMAIL_PREFIX + token);
    if (!userId) {
      return false;
    }
    await User.update({ id: parseInt(userId, 10) }, { isConfirmed: true });
    return true;
  }
}
