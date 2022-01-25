import { IsEmail, IsString } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
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
  displayName: string

  @Column()
  @Field()
  password: string
}
