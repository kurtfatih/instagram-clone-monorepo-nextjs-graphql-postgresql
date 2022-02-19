import { IsString, MaxLength } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import { mixedMessageWithClassValidatorForLengthError } from "../constants/validationconstants"
import { maxCommentLength } from "instagram-clone-shared/config"
import { Post } from "./Post"

@Entity("Comments")
@ObjectType()
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string

  @Column()
  @IsString()
  @MaxLength(maxCommentLength, {
    message: mixedMessageWithClassValidatorForLengthError({
      property: "caption",
      max: true
    })
  })
  @Field(() => String)
  text: string

  @Column({ default: 0 })
  @Field({ defaultValue: 0, nullable: true })
  likes: number = 0

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, {
    primary: true,
    onDelete: "CASCADE"
  })
  @TypeormLoader()
  post: Post
}
//has relationshit with user as many to one
//has relationship with post as many to many
