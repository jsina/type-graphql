import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { User } from "../../../entities";

@ValidatorConstraint({ async: true })
export class IsEmailExistConstraint implements ValidatorConstraintInterface {
  validate(email: string, _args: ValidationArguments) {
    return User.findOne({ where: { email } }).then((user) => {
      if (user) {
        return false;
      }
      return true;
    });
  }
}

export function IsEmailExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailExistConstraint,
    });
  };
}
