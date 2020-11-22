import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";
import { RegisterInput } from "./register";
import { User } from "../../entities";
import { IsAuth } from "../middleware/IsAuth";
import { Roles } from "../../types";
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
    return user;
  }
}
