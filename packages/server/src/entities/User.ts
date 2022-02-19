import { IsEmail, IsString, MinLength } from "class-validator"
import bcrypt from "bcrypt"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import { saltRounds } from "../constants/bcyrptconstant"
import { mixedMessageWithClassValidatorForLengthError } from "../constants/validationconstants"
import { Post } from "./Post"
import {
  minimumDisplayNameLength,
  minimumPasswordLength
} from "instagram-clone-shared/config"

export type UserTokenType = { access_token: string; refresh_token: string }

export type RoleType = "ADMIN" | "MODERATOR" | "USER"

@ObjectType()
export class UserToken {
  @Field() // and explicitly use it
  readonly access_token: string
  @Field() // and explicitly use it
  readonly refresh_token: string
}

@Entity("User")
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => UserToken) // and explicitly use it
  readonly token: UserToken

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
    message: mixedMessageWithClassValidatorForLengthError({
      property: "displayName"
    })
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
    message: mixedMessageWithClassValidatorForLengthError({
      property: "password"
    })
  })
  password: string
  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
}
