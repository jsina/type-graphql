import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { RegisterInput } from "./register";
import { User } from "../../entities";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  @Authorized()
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
