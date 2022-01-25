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
  @Field()
  description: string
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

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async deletePostById(
    @Arg("post_id") postId: string,
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<boolean | Error> {
    const userPost = await User.findOneOrFail(userJwtPayload?.id, {
      relations: ["posts"]
    })
    const post = userPost.posts.find(({ id }) => id === postId)
    if (!post) throw new Error("Something went wrong")
    await post.remove()
    return true
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async updatePostDescriptionById(
    @Arg("post_id") postId: string,
    @Arg("description") description: string,
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<boolean | Error> {
    const userPost = await User.findOneOrFail(userJwtPayload?.id, {
      relations: ["posts"]
    })
    const post = userPost.posts.find(({ id }) => id === postId)
    if (!post) throw new Error("Someting went wrong")
    await Post.update({ id: post.id }, { description })
    return true
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async likePost(
    @Arg("post_id") postId: string,
    @Arg("initialLike") initialLike: number
  ): Promise<boolean | Error> {
    try {
      await Post.update({ id: postId }, { likes: initialLike + 1 })
      return true
    } catch {
      throw new Error("Someting went wrong")
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async dislikePost(
    @Arg("post_id") postId: string,
    @Arg("initialLike") initialLike: number
  ): Promise<boolean | Error> {
    try {
      await Post.update({ id: postId }, { likes: initialLike - 1 })
      return true
    } catch {
      throw new Error("Someting went wrong")
    }
  }
}
