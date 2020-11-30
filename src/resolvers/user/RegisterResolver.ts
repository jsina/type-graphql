import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";

import { RegisterInput } from "./register";
import { User } from "../../entities";
import { IsAuth } from "../middleware/IsAuth";
import { Roles } from "../../types";
import { redis } from "../../redis";
import { sendEmail } from "../../utils";
import { CONFIRM_EMAIL_PREFIX } from "../../constants";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  @UseMiddleware(IsAuth(Roles.GUEST))
  async hello() {
    return "Hello World!";
  }

  @Mutation(() => User)
  async register(
    @Arg("input") { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    }).save();

    const token = CONFIRM_EMAIL_PREFIX + v4();
    const url = `http://localhost:3000/users/confirmation/${token}`;

    sendEmail(user.email, url);
    await redis.set(token, user.id, "EX", 60 * 15);

    return user;
  }
}
