import { validate } from "class-validator"
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql"
import { Comments } from "../entities/Comments"
import { Post } from "../entities/Post"
import { isAuth } from "../middleware/usermiddleware"
import {
  getValidationErrorMessage,
  isThereValidationError
} from "../utils/validateAndSaveOrThrowError"

@Resolver(Comments)
export class CommentsResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async createComment(
    @Arg("postId") postId: string,
    @Arg("text") text: string
  ): Promise<boolean | Error> {
    const newComment = Comments.create({
      post: { id: postId },
      text: text
    })
    const validateCheck = await validate(newComment)
    const isValidateErrorExist = isThereValidationError(validateCheck)
    if (isValidateErrorExist) {
      const errMsg = getValidationErrorMessage(validateCheck)
      return errMsg
    }
    return true
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteCommentByPostAndCommentId(
    @Arg("postId") postId: string,
    @Arg("commentId") commentId: string
  ): Promise<boolean | Error> {
    const post = await Post.findOne(postId, {
      relations: ["comments"]
    })
    const comment = post?.comments.find(({ id }) => id === commentId)
    if (!comment) throw new Error("Comment couldn found")
    await comment.remove()
    return true
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async updateCommentTextById(
    @Arg("commentId") commentId: string,
    @Arg("text") text: string,
    @Arg("postId") postId: string
  ): Promise<boolean | Error> {
    const post = await Post.findOne(postId, {
      relations: ["comments"]
    })
    const comment = post?.comments.find(({ id }) => id === commentId)
    if (!comment) throw new Error("Comment not found")

    await Comments.update({ id: commentId }, { text })
    return true
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async likeComment(
    @Arg("commentId") commentId: string,
    @Arg("initialLike") initialLike: number
  ): Promise<boolean | Error> {
    try {
      await Comments.update({ id: commentId }, { likes: initialLike + 1 })
      return true
    } catch {
      throw new Error("Someting went wrong")
    }
  }
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async unLikeComment(
    @Arg("commentId") commentId: string,
    @Arg("initialLike") initialLike: number
  ): Promise<boolean | Error> {
    try {
      await Comments.update({ id: commentId }, { likes: initialLike - 1 })
      return true
    } catch {
      throw new Error("Someting went wrong")
    }
  }
}
