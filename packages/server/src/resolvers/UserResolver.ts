import {
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
  Arg,
  Mutation,
  // PubSub,
  // PubSubEngine,
  Root,
  Subscription
} from "type-graphql"
import { User } from "../entities/User"
import { SharedContextType, userJWTPayloadType } from "../context/types"
import { isAuth } from "../middleware/usermiddleware"
import {
  // getValidationError,
  getValidationErrorMessage,
  isThereValidationError
  // validateAndSaveOrThrowError
} from "../utils/validateAndSaveOrThrowError"
import { UserLoginInput, UserCreateInput } from "./userLoginInputType"
// import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateJwtToken"
import { validate } from "class-validator"

@Resolver(User)
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async user(
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<User | undefined> {
    const user = await User.findOne(userJwtPayload?.id)
    return user
  }

  @UseMiddleware(isAuth)
  @Query(() => [User], { nullable: true })
  async findFriends(
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<User[] | null> {
    const user = await User.findOne(userJwtPayload?.id)
    const userFriends = user?.friends ?? null
    return userFriends
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async addFriends(
    @Arg("friends_id") friendsId: string,
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<boolean | Error> {
    const user = await User.findOne(userJwtPayload?.id)
    const friendUser = await User.findOne(friendsId)

    if (!user || !friendUser) throw new Error("smt went wrong")

    if (user.friends && user.friends.length > 0) {
      user.friends.push(friendUser)
    } else {
      user.friends = [friendUser]
    }

    await user.save()
    return true
  }

  @Mutation(() => String, { nullable: true })
  async signIn(
    @Arg("emailAndPassword") { email, password }: UserLoginInput
  ): Promise<string | undefined | Error> {
    try {
      const user = await User.findOne({ email })

      if (!user) throw Error("User not found by this email ")

      const userHashedPassword = user.password
      const isMatch = await bcrypt.compare(password, userHashedPassword)
      if (!isMatch)
        throw Error(
          "Password not matched with email please check your password or click forgot to password"
        )

      const userJwtPayload: userJWTPayloadType = {
        id: user.id,
        email: email,
        displayName: user.displayName,
        role: user.role
      }
      const generatedToken = generateToken(userJwtPayload)
      return generatedToken
    } catch (e: any) {
      return e
    }
  }
  @Mutation(() => Boolean, { nullable: true })
  async signUp(
    @Arg("createUserInput") { displayName, email, password }: UserCreateInput
  ): Promise<boolean | Error> {
    try {
      const newUserObj = { email, displayName, password }
      const newUser = User.create(newUserObj)
      const errors = await validate(newUser)
      const isValidErrorExist = isThereValidationError(errors)
      if (isValidErrorExist) {
        const validationErrMsg = getValidationErrorMessage(errors)
        return validationErrMsg
      } else {
        await newUser.save()
      }
      return true
    } catch (e: any) {
      if (e.code === "23505") {
        return new Error(`${email} already exist please try another email.`)
      }
      return new Error(e)
    }
  }

  @Subscription(() => User, {
    topics: "USERLOGIN"
  })
  userLoginSubscribe(
    @Root() userJwtPayload: userJWTPayloadType
  ): userJWTPayloadType {
    console.log("that user loggedin")
    return userJwtPayload
  }
}
