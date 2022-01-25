import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  InputType,
  Field,
  Arg,
  UseMiddleware
} from "type-graphql"
import { SharedContextType } from "../context/types"
import { Post } from "../entities/Post"
import { User } from "../entities/User"
import { isAuth } from "../middleware/checkIsUsert"

@InputType({ description: "Update Post Input That" })
class UpdatePostInput implements Partial<Post> {
  @Field()
  likes: number

  @Field({ nullable: true })
  description?: string
}

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async getAllPosts(): Promise<Post[]> {
    const allPost = await Post.find()
    return allPost
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async createPost(
    @Arg("postInput") { description }: UpdatePostInput,
    @Ctx() { payload }: SharedContextType
  ): Promise<boolean> {
    const { id } = payload as { id: string; email: string; displayName: string }
    console.log("userid", id)
    await Post.create({
      description: description,
      likes: 0,
      user: { id }
    }).save()
    // validateWrap(res, res.save)
    return true
  }

  @Mutation(() => Boolean)
  async deleteAllPosts(): Promise<boolean> {
    await Post.createQueryBuilder().delete().execute()
    return true
  }
  // @Mutation() async deletePostById(@Ctx() { repo }: SharedContextType) {
  //   const posts = await repo(Post).createQueryBuilder("users").getMany()
  //   return posts
  // }
  // @Mutation() async updatePostById(@Ctx() { repo }: SharedContextType) {
  //   const posts = await repo(Post).createQueryBuilder("users").getMany()
  //   return posts
  // }
}
