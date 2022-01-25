import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  Arg,
  UseMiddleware
} from "type-graphql"
import { SharedContextType } from "../context/types"
import { Comments } from "../entities/Comments"
import { isAuth } from "../middleware/checkIsUsert"

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
    // @Ctx() { payload }: SharedContextType
  ): Promise<boolean> {
    await Comments.create({
      post: { id: postId },
      text: text
    }).save()
    return true
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteCommentById(
    @Arg("commentId") commentId: string
  ): Promise<boolean> {
    await Comments.delete({ id: commentId })
    return true
  }

  @Mutation(() => Boolean)
  async deleteAllComments(): Promise<boolean> {
    await Comments.createQueryBuilder().delete().execute()
    return true
  }
}
