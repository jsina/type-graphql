import { Field, InputType } from "type-graphql";
import { MinLength } from "class-validator";

@InputType()
export class PasswordInput {
  @Field()
  @MinLength(8)
  password: string;
}
