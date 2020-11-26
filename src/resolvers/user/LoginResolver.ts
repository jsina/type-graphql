import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcryptjs from "bcryptjs";

import { Context } from "../../types";
import { User } from "../../entities";
@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    if (!user.isConfirmed) {
      throw new Error("Your email has not confirmed!");
    }
    const comparePassword = bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return null;
    }
    context!.req!.session!.uid = user.id;
    return user;
  }
}
