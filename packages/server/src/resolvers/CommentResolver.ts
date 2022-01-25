import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql"
import { Comments } from "../entities/Comments"
import { isAuth } from "../middleware/checkIsUsert"
import { validAndSaveOrThrowError } from "../middleware/validAndSaveOrThrowError"

@Resolver(Comments)
export class CommentsResolver {
  @Query(() => [Comments])
  async getAllComments(): Promise<Comments[]> {
    const allComments = await Comments.find()
    return allComments
  }

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
    const createCommentOrError = validAndSaveOrThrowError(newComment)
    return createCommentOrError
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteCommentById(
    @Arg("commentId") commentId: string
  ): Promise<boolean | Error> {
    try {
      await Comments.delete({ id: commentId })
      return true
    } catch {
      throw Error("someting went wrong")
    }
  }

  @Mutation(() => Boolean)
  async deleteAllComments(): Promise<boolean> {
    await Comments.createQueryBuilder().delete().execute()
    return true
  }
}
