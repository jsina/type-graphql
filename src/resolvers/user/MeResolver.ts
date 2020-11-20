import { Ctx, Query, Resolver } from "type-graphql";

import { User } from "../../entities";
import { Context } from "../../types";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: Context): Promise<User | null> {
    const uid = context.req.session.uid;
    if (!uid) {
      return null;
    }
    const user = await User.findOne({
      where: {
        id: uid,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
