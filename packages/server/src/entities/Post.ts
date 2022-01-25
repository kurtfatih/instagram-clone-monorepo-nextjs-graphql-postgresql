import { IsHash, IsEmail, IsString, IsNumber } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm"
import { Comments } from "./Comments"
import { User } from "./User"

@Entity("Post")
@ObjectType()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  @Field({ nullable: true })
  description?: string

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  @TypeormLoader()
  user: User

  // @Field()
  // @RelationId((user: User) => user.posts) // you need to specify target relation
  // userId: number

  @IsNumber()
  @Column({ default: 0 })
  @Field({ defaultValue: 0 })
  likes: number

  @Field(() => [Comments], { nullable: true })
  @OneToMany(() => Comments, (comment) => comment.post, { cascade: true })
  @TypeormLoader()
  comments: Comments[]
}
