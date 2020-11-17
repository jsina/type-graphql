import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { RegisterInput } from "./RegisterInput";
import { User } from "../../entities";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @FieldResolver()
  async fullName(@Root() { firstName, lastName }: User) {
    return `${firstName} ${lastName}`;
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
