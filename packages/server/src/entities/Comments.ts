import { IsHash, IsEmail, IsString, IsNumber } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import { Post } from "./Post"
import { User } from "./User"

@Entity("Comments")
@ObjectType()
export class Comments extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => Post)
  @ManyToMany(() => Post, (post) => post.comments, { primary: true })
  post: Post
}
//has relationshit with user as many to one
//has relationship with post as many to many
