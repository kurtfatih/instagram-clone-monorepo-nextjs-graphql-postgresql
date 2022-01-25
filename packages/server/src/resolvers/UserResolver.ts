import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Field,
  Mutation,
  UseMiddleware,
  InputType,
  FieldResolver
} from "type-graphql"
import { RoleType, User } from "../entities/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { SharedContextType } from "../context/types"
import { saltRounds } from "../constants/bcyrptconstant"
import { validate } from "class-validator"
import { validAndSaveOrThrowError } from "../middleware/validAndSaveOrThrowError"
import { isAuth } from "../middleware/checkIsUsert"

@InputType()
export class UserLoginInput implements Partial<User> {
  @Field()
  email: string
  @Field()
  password: string
}

@InputType()
export class UserCreateInput extends UserLoginInput {
  @Field()
  displayName: string
}
@InputType()
export class UserAdditionalInfoInput implements Partial<User> {
  @Field()
  role: RoleType
}

@Resolver(User)
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => User)
  async getUserById(@Ctx() { userJwtPayload }: SharedContextType) {
    if (!userJwtPayload) throw new Error("Someting went wrong")
    const user = await User.findOne(userJwtPayload.id)
    if (!user) throw new Error("Someting went wrong")
    return user
  }

  @UseMiddleware(isAuth)
  @Query(() => [User] || Error, { nullable: true })
  async findFriends(
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<User[] | Error> {
    if (!userJwtPayload) throw new Error("Someting went wrong")
    const user = await User.findOne(userJwtPayload.id)
    if (!user) throw new Error("smt went wrong")
    return user.friends
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean || Error)
  async addFriends(
    @Arg("friends_id") friendsId: string,
    @Ctx() { userJwtPayload }: SharedContextType
  ): Promise<boolean | Error> {
    if (!userJwtPayload) throw new Error("smt went wrong")
    const user = await User.findOne(userJwtPayload.id)
    const friendUser = await User.findOne(friendsId)
    if (!user) throw new Error("smt went wrong")
    if (!friendUser) throw new Error("smt went wrong")
    console.log("my friends ", user, friendUser)
    if (user.friends && user.friends.length > 0) {
      user.friends.push(friendUser)
    } else {
      user.friends = [friendUser]
    }
    await user.save()
    return true
  }
  @Mutation(() => String)
  async login(
    @Arg("loginData") { email, password }: UserLoginInput
  ): Promise<string> {
    let userToken = ""
    const userMatchWithEmail = await User.find({ email })
    const user = userMatchWithEmail[0]
    const userJwtPayload = {
      id: user.id,
      email: email,
      displayName: user.displayName,
      role: user.role
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
  async createUser(
    @Arg("userCreateInput") { displayName, email, password }: UserCreateInput
  ): Promise<boolean | Error> {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    // Store hash in your password DB.
    const newUserObj = { email, displayName, password: hash }
    const newUser = User.create(newUserObj)

    const createPostOrError = await validAndSaveOrThrowError(newUser)
    return createPostOrError
  }
}
