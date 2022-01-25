import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Mutation,
  UseMiddleware
} from "type-graphql"
import { User } from "../entities/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { SharedContextType } from "../context/types"
import { saltRounds } from "../constants/bcyrptconstant"
import { validate } from "class-validator"
import { isLoggedIn } from "../middleware/checkIsUsert"
import { validAndSaveOrThrowError } from "../middleware/validAndSaveOrThrowError"

@Resolver(User)
export class UserResolver {
  // @UseMiddleware(isAuth)
  @Query(() => [User])
  async getAllUsers() {
    const users = await User.find()
    return users
  }

  @Mutation(() => String)
  @UseMiddleware(isLoggedIn)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    let userToken = ""
    const userMatchWithEmail = await User.find({ email })
    const user = userMatchWithEmail[0]
    const userJwtPayload = {
      id: user.id,
      email: email,
      displayName: user.displayName
    }
    const userHashedPassword = user.password
    const isMatch = bcrypt.compareSync(password, userHashedPassword) // true
    if (isMatch) {
      if (!process.env.JWT_SECRET_KEY) return ""
      const token = jwt.sign(userJwtPayload, process.env.JWT_SECRET_KEY)
      console.log("generatedtoken", token)
      userToken = token
    }

    return userToken
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isLoggedIn)
  async createUser(
    @Arg("email") email: string,
    @Arg("displayName") displayName: string,
    @Arg("password") password: string
  ): Promise<boolean | Error> {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    // Store hash in your password DB.
    const newUserObj = { email, displayName, password: hash }
    const newUser = User.create(newUserObj)

    const createPostOrError = await validAndSaveOrThrowError(newUser)
    return createPostOrError
  }

  @Mutation(() => Boolean)
  async deleteAllUser(): Promise<boolean> {
    await User.createQueryBuilder().delete().execute()
    return true
  }
}
