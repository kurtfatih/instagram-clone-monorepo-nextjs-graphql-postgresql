import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import { Comments } from "../entities/Comments"
import { Post } from "../entities/Post"
import { RoleType, User } from "../entities/User"
import { isAdmin, isAuth } from "../middleware/usermiddleware"

@Resolver()
export class AdminResolver {
  // @UseMiddleware(isAuth)

  @UseMiddleware(isAuth, isAdmin)
  @Query(() => [User])
  async getAllUsers() {
    const users = await User.find()
    return users
  }

  @UseMiddleware([isAuth, isAdmin])
  @Query(() => [Post])
  async getAllPosts(): Promise<Post[]> {
    const allPost = await Post.find()
    return allPost
  }

  @UseMiddleware([isAuth, isAdmin])
  @Query(() => [Comments])
  async getAllComments(): Promise<Comments[]> {
    const allComments = await Comments.find()
    return allComments
  }

  @UseMiddleware([isAuth, isAdmin])
  @Mutation(() => Boolean)
  async deleteAllComments(): Promise<boolean> {
    await Comments.createQueryBuilder().delete().execute()
    return true
  }

  @UseMiddleware([isAuth, isAdmin])
  @Mutation(() => Boolean)
  async deleteAllUser(): Promise<boolean> {
    await User.createQueryBuilder().delete().execute()
    return true
  }

  @UseMiddleware([isAuth, isAdmin])
  @Mutation(() => Boolean)
  async deleteAllPosts(): Promise<boolean> {
    await Post.createQueryBuilder().delete().execute()
    return true
  }

  @UseMiddleware([isAuth, isAdmin])
  @Mutation(() => Boolean)
  async changeUserRole(
    @Arg("user_email") userEmail: string,
    @Arg("role") role: RoleType
  ): Promise<boolean> {
    await User.update({ email: userEmail }, { role })
    return true
  }

  // todo change user role
}
