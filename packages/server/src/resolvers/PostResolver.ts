import { createWriteStream } from "fs"
import { FileUpload, GraphQLUpload } from "graphql-upload"
import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  InputType,
  Field,
  Arg,
  UseMiddleware,
  Subscription,
  Root,
  Args,
  PubSubEngine,
  PubSub
} from "type-graphql"
import { SharedContextType } from "../context/types"
import { Post, PostNotification } from "../entities/Post"
import { User } from "../entities/User"
import { isAuth } from "../middleware/checkIsUsert"
import { validAndSaveOrThrowError } from "../middleware/validAndSaveOrThrowError"

@InputType({ description: "Update Post Input That" })
class UpdatePostInput implements Partial<Post> {
  @Field()
  description: string
}

interface NOTIFICATIONI {
  post: Post
  date: Date
}
@Resolver(Post)
export class PostResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async createPost(
    @Arg("postInput") { description }: UpdatePostInput,
    @Ctx() { userJwtPayload }: SharedContextType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<true | Error> {
    if (!userJwtPayload) throw new Error("User payload couldn find")
    const { id } = userJwtPayload

    const newPost = Post.create({
      description: description,
      user: { id }
    })

    const createPostOrError = await validAndSaveOrThrowError(newPost)

    const payload: Post = newPost
    await pubsub.publish("NOTIFICATIONS", payload)
    return createPostOrError
    // validateWrap(res, res.save)
  }
  // post created listener
  @Subscription(() => PostNotification, {
    topics: "NOTIFICATIONS"
  })
  newPostCreatedNotification(
    @Root() postPayload: Post
    // @Args() args: Post
  ): PostNotification {
    console.log("thats triggered")
    return {
      post: postPayload,
      date: new Date()
    }
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

  @Mutation(() => Boolean)
  async addImageToPost(
    @Arg("picture", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
        .on("finish", () => resolve(true))
        .on("close", () => resolve(true))
        .on("error", () => reject(false))
    )
  }
}
