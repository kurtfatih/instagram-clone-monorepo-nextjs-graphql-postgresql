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
import { isAuth, isLoggedIn } from "../middleware/checkIsUsert"

@Resolver(User)
export class UserResolver {
  // @UseMiddleware(isAuth)
  @Query(() => [User])
  async users(@Ctx() { repo }: SharedContextType) {
    console.log("what")

    const users = await repo(User).createQueryBuilder("users").getMany()
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
  ): Promise<boolean> {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    // Store hash in your password DB.
    const newUserObj = { email, displayName, password: hash }
    const res = User.create(newUserObj)
    await validate(res)
      .then(async (errors) => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          console.log(errors)
          return false
        } else {
          try {
            await res.save()
          } catch (e) {
            console.log(e)
          }
        }
      })
      .catch((e) => console.log(e))
    return true
  }
}
