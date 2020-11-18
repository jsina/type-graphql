import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { IsEmailExist } from "./IsEmailExist";
@InputType()
export class RegisterInput {
  @Length(1, 20)
  @Field()
  firstName: string;
  @Field()
  @Length(1, 20)
  lastName: string;
  @Field()
  @IsEmail()
  @IsEmailExist({ message: "email is already use!" })
  email: string;
  @Field()
  password: string;
}
