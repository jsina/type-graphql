import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ type: "text", unique: true })
  @Field()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @Field()
  fullName(@Root() { firstName, lastName }: User): string {
    return `${firstName} ${lastName}`;
  }
}
