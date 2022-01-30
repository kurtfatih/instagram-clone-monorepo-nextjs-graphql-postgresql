import {
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
  Arg,
  Mutation,
  PubSub,
  PubSubEngine,
  Root,
  Subscription
} from "type-graphql"
import { User } from "../entities/User"
import { SharedContextType, userJWTPayloadType } from "../context/types"
import { isAuth } from "../middleware/usermiddleware"
import { validateAndSaveOrThrowError } from "../utils/validateAndSaveOrThrowError"
import { UserLoginInput, UserCreateInput } from "./userLoginInputType"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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
    @Arg("emailAndPassword") { email, password }: UserLoginInput,
    @PubSub() pubsub: PubSubEngine
  ): Promise<string> {
    let userToken = ""

    const userMatchWithEmail = await User.findOne({ email })
    const user = userMatchWithEmail

    if (!user) return userToken

    const userJwtPayload: userJWTPayloadType = {
      id: user.id,
      email: email,
      displayName: user.displayName,
      role: user.role
    }

    const userHashedPassword = user.password

    const isMatch = await bcrypt.compare(password, userHashedPassword) // true
    if (isMatch) {
      if (!process.env.JWT_SECRET_KEY) return ""
      const token = jwt.sign(userJwtPayload, process.env.JWT_SECRET_KEY)
      console.log("generatedtoken", token)
      userToken = token
    }
    await pubsub.publish("USERLOGIN", userJwtPayload)
    return userToken
  }

  @Mutation(() => Boolean)
  async signUp(
    @Arg("createUserInput") { displayName, email, password }: UserCreateInput
  ): Promise<boolean | Error> {
    // const salt = bcrypt.genSaltSync(saltRounds)
    // const hash = bcrypt.hashSync(password, salt)
    // Store hash in your password DB.
    const newUserObj = { email, displayName, password }
    const newUser = User.create(newUserObj)

    const createPostOrError = await validateAndSaveOrThrowError(newUser)
    return createPostOrError
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
