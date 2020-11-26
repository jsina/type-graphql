import { Arg, Mutation, Resolver } from "type-graphql";

import { redis } from "../../redis";
import { User } from "../../entities";

@Resolver()
export class EmailConfirmation {
  @Mutation(() => Boolean)
  async emailConfirmation(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(token);
    if (!userId) {
      return false;
    }
    await User.update({ id: parseInt(userId, 10) }, { isConfirmed: true });
    return true;
  }
}
