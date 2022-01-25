import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Field,
  Mutation,
  UseMiddleware,
  InputType
} from "type-graphql"
import { RoleType, User } from "../entities/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { SharedContextType } from "../context/types"
import { saltRounds } from "../constants/bcyrptconstant"
import { validate } from "class-validator"
import { validAndSaveOrThrowError } from "../middleware/validAndSaveOrThrowError"
import { isAdmin, isAuth } from "../middleware/checkIsUsert"

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
