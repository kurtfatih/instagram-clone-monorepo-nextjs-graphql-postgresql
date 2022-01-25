import { IsEmail, IsString, MinLength } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import {
  getErrorMessageWithClassValidatorMessage,
  minimumDisplayNameLength,
  minimumPasswordLength
} from "../constants/validationconstants"
import { Post } from "./Post"

@Entity("User")
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  @Field(() => [Post])
  @TypeormLoader()
  posts: Post[]

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string

  @IsString()
  @Column()
  @Field()
  @MinLength(minimumDisplayNameLength, {
    message: getErrorMessageWithClassValidatorMessage("displayName")
  })
  displayName: string

  @Column()
  @Field()
  @IsString()
  @MinLength(minimumPasswordLength, {
    message: getErrorMessageWithClassValidatorMessage("password")
  })
  password: string
}
