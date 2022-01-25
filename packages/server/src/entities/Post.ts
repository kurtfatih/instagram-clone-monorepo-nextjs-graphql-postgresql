import { IsHash, IsEmail, IsString, IsNumber, MaxLength } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import {
  getErrorMessageWithClassValidatorMessage,
  maxDescriptionLength
} from "../constants/validationconstants"
import { Comments } from "./Comments"
import { User } from "./User"

@Entity("Post")
@ObjectType()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @IsString()
  @MaxLength(maxDescriptionLength, {
    message: getErrorMessageWithClassValidatorMessage("Post Description", true)
  })
  @Column()
  @Field({ nullable: true })
  description?: string

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  @TypeormLoader()
  user: User

  @IsNumber()
  @Column({ default: 0 })
  @Field({ defaultValue: 0, nullable: true })
  likes: number = 0

  @Field(() => [Comments], { nullable: true })
  @OneToMany(() => Comments, (comment) => comment.post, { cascade: true })
  @TypeormLoader()
  comments: Comments[]
}
