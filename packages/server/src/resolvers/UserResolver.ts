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
import { generateAccessToken } from "../utils/generateJwtToken"
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

  @Mutation(() => String)
  async signIn(
    @Arg("emailAndPassword") { email, password }: UserLoginInput
  ): Promise<string | undefined> {
    try {
      //user find by email
      const userFindByEmail = await User.findOneOrFail({ email })
      const user = userFindByEmail
      // create jwt payload instance
      const userJwtPayload: userJWTPayloadType = {
        id: user.id,
        email: email,
        displayName: user.displayName,
        role: user.role
      }
      const userHashedPassword = user.password
      // check if the user hashed password and input matched
      const isMatch = await bcrypt.compare(password, userHashedPassword) // true
      if (isMatch) {
        const generatedToken = generateAccessToken(userJwtPayload)
        return generatedToken
      }
    } catch (e: any) {
      throw Error(e)
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async signUp(
    @Arg("createUserInput") { displayName, email, password }: UserCreateInput
  ): Promise<boolean | Error> {
    const newUserObj = { email, displayName, password }
    const newUser = User.create(newUserObj)
    const errors = await validate(newUser)
    const isValidErrorExist = isThereValidationError(errors)
    if (isValidErrorExist) {
      const validationErrMsg = getValidationErrorMessage(errors)
      return validationErrMsg
    } else {
      newUser.save()
      return true
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
