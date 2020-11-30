import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";

import { User } from "../../entities";
import { redis } from "../../redis";
import { FORGET_PASSWORD_PREFIX } from "../../constants";
import { sendEmail } from "../../utils";

@Resolver()
export class ForgetPasswordResolver {
  @Mutation(() => Boolean)
  async forgetPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    // always returned true to prevent user to check users' email from our server
    if (!user) {
      return true;
    }

    const token = FORGET_PASSWORD_PREFIX + v4();
    const url = `http://localhost:3000/users/forget-password/${token}`;
    sendEmail(user.email, url);
    await redis.set(token, user.id, "EX", 60 * 15);

    return true;
  }
}
