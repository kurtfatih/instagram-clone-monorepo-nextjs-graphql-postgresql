import { IsString, IsNumber, MaxLength } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm"
import { mixedMessageWithClassValidatorForLengthError } from "../constants/validationconstants"
import { maxDescriptionLength } from "instagram-clone-shared/config"
import { Comments } from "./Comments"
import { Image } from "./Image"
import { User } from "./User"

@Entity("Post")
@ObjectType()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @IsString()
  @MaxLength(maxDescriptionLength, {
    message: mixedMessageWithClassValidatorForLengthError({
      property: "Post Description",
      max: true
    })
  })
  @Column()
  @Field({ nullable: true })
  description?: string

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  @Field(() => User)
  @TypeormLoader()
  user: User

  @IsNumber()
  @Column({ default: 0 })
  @Field({ defaultValue: 0, nullable: true })
  likes: number = 0

  // will update
  @OneToOne(() => Image, (image) => image.post, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @Field(() => Image)
  @TypeormLoader()
  image: Image

  @Field(() => [Comments], { nullable: true })
  @OneToMany(() => Comments, (comment) => comment.post)
  @TypeormLoader()
  comments: Comments[]
}

@ObjectType()
export class PostNotification {
  @Field()
  post: Post

  @Field()
  date: Date
}
