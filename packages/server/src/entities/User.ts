import { IsEmail, IsString, MinLength } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import {
  getErrorMessageWithClassValidatorMessage,
  minimumDisplayNameLength,
  minimumPasswordLength
} from "../constants/validationconstants"
import { Post } from "./Post"

export type RoleType = "ADMIN" | "MODERATOR" | "USER"

@Entity("User")
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @Field(() => [Post])
  @TypeormLoader()
  posts: Post[]

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string

  @Column({ default: "USER" })
  @Field(() => String, { defaultValue: "USER" })
  role: string

  @IsString()
  @Column()
  @Field()
  @MinLength(minimumDisplayNameLength, {
    message: getErrorMessageWithClassValidatorMessage("displayName")
  })
  displayName: string

  @ManyToMany(() => User, { lazy: true })
  @JoinTable()
  @Field(() => [User], { nullable: true })
  @TypeormLoader((user: User) => [user.id])
  friends: User[]

  @Column()
  @Field()
  @IsString()
  @MinLength(minimumPasswordLength, {
    message: getErrorMessageWithClassValidatorMessage("password")
  })
  password: string
}
