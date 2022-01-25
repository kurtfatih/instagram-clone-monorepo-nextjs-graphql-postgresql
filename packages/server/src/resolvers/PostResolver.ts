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
import { validAndSaveOrThrowError } from "../middleware/validAndSaveOrThrowError"

@InputType({ description: "Update Post Input That" })
class UpdatePostInput implements Partial<Post> {
  @Field({ nullable: true })
  description?: string
}

@Resolver(Post)
export class PostResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async createPost(
    @Arg("postInput") { description }: UpdatePostInput,
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<true | Error> {
    if (!userJwtPayload) throw new Error("User payload couldn find")
    const { id } = userJwtPayload

    const newPost = Post.create({
      description: description,
      user: { id }
    })

    const createPostOrError = await validAndSaveOrThrowError(newPost)
    return createPostOrError
    // validateWrap(res, res.save)
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
