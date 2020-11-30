import { Field, InputType } from "type-graphql";

import { PasswordInput } from "../../shared";

@InputType()
export class ResetPasswordInput extends PasswordInput {
  @Field()
  token: string;
}
