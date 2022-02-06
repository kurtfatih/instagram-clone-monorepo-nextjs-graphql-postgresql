import { validate } from "class-validator"
import { createWriteStream } from "fs"
import { FileUpload, GraphQLUpload } from "graphql-upload"
import {
  Resolver,
  Ctx,
  Mutation,
  InputType,
  Field,
  Arg,
  UseMiddleware,
  Subscription,
  Root,
  // PubSubEngine,
  // PubSub,
  Query
} from "type-graphql"
import { SharedContextType } from "../context/types"
import { Post, PostNotification } from "../entities/Post"
import { isAuth } from "../middleware/usermiddleware"
import {
  getValidationErrorMessage,
  isThereValidationError,
  // validateAndSaveOrThrowError
} from "../utils/validateAndSaveOrThrowError"

@InputType({ description: "Update Post Input That" })
class UpdatePostInput implements Partial<Post> {
  @Field()
  description: string
}

@Resolver(Post)
export class PostResolver {
  // post resolvers
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean, { nullable: true })
  async createPost(
    @Arg("postInput") { description }: UpdatePostInput,
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<boolean | Error> {
    if (!userJwtPayload) throw new Error("User payload couldn find")
    const { id } = userJwtPayload

    const newPost = Post.create({
      description: description,
      user: { id }
    })

    // const createPostOrError = await validateAndSaveOrThrowError(newPost)

    const validateCheck = await validate(newPost)
    const isValidateErrorExist = isThereValidationError(validateCheck)
    if (isValidateErrorExist) {
      const errMsg = getValidationErrorMessage(validateCheck)
      return errMsg
    }

    // const payload: Post = newPost
    // await pubsub.publish("NOTIFICATIONS", payload)

    return true
  }

  @UseMiddleware(isAuth)
  @Query(() => Post, { nullable: true })
  async post(
    @Arg("post_id") postId: string,
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<Post | undefined> {
    const post = await Post.findOne(postId, {
      where: { id: postId, user: userJwtPayload?.id }
    })
    return post
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async deletePostById(
    @Arg("post_id") postId: string,
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<boolean | Error> {
    const post = await Post.findOne(postId, {
      where: { id: postId, user: userJwtPayload?.id }
    })
    if (!post) throw new Error("Someting went wrong")
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
    const post = await Post.findOne(postId, {
      where: { id: postId, user: userJwtPayload?.id }
    })
    console.log(post)
    if (!post) throw new Error("Someting went wrong")
    post.description = description
    await post.save()
    // await Post.update({ id: post.id }, { description })
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

  // post subscriptions
  // -- - -- -- - -- - - - -- -
  // post created listener
  @Subscription(() => PostNotification, {
    topics: "NOTIFICATIONS"
  })
  newPostCreatedNotification(
    @Root() postPayload: Post
    // @Args() args: Post
  ): PostNotification {
    return {
      post: postPayload,
      date: new Date()
    }
  }
}
