import { ObjectType, Field } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import { Post } from "./Post"

@Entity("Image")
@ObjectType()
export class Image extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToOne(() => Post, (post) => post.image, { onDelete: "CASCADE" })
  @Field(() => Post)
  @TypeormLoader()
  post: Post
}
