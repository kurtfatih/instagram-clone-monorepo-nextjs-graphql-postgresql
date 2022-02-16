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
import { User, UserToken, UserTokenType } from "../entities/User"
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
import { generateJwtToken } from "../utils/generateJwtToken"
import { validate } from "class-validator"
import { verify } from "jsonwebtoken"
import { sendMailToUser } from "../nodemailer"
import { saltRounds } from "../constants/bcyrptconstant"

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

  @Mutation(() => UserToken, { nullable: true })
  async signIn(
    @Arg("emailAndPassword") { email, password }: UserLoginInput
  ): Promise<UserToken | undefined | Error> {
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
        role: user.role,
        iat: Math.floor(Date.now() / 1000), // now as second
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour exp
      }
      const generatedAccessToken = generateJwtToken(userJwtPayload)

      if (!generatedAccessToken)
        throw Error("Something went wrong please try again later...")

      const generatedRefreshToken = generateJwtToken(
        {
          id: user.id,
          iat: Math.floor(Date.now() / 1000) // now as second
        },
        {
          expiresIn: "365d"
        }
      )

      if (!generatedRefreshToken)
        throw Error("Something went wrong please try again later...")

      return {
        access_token: generatedAccessToken,
        refresh_token: generatedRefreshToken
      }
    } catch (e: any) {
      return e
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email })
      if (!user) throw Error("User not found by this email ")

      const resetPasswordToken = generateJwtToken(
        {
          id: user.id,
          iat: Math.floor(Date.now() / 1000) // now as second
        },
        {
          expiresIn: "120000"
        }
      )

      await sendMailToUser({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Password reset email✔", // Subject line
        text: "You can clickted link and go ?", // plain text body
        html: `<a target="_blank" href='http://localhost:3000/handler/reset_password/#${resetPasswordToken}'>Reset password<a>` // html body
      })

      throw Error(`Password reset email sended to ${email}`)
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

  @Mutation(() => Boolean, { nullable: true })
  async resetPassword(
    @Arg("password") password: string,
    @Arg("confirmationPassword") confirmationPassword: string,
    @Ctx() { req }: SharedContextType
  ): Promise<void> {
    try {
      const authorization = req.headers["authorization"]
      if (!authorization) throw Error("Something went wrong please try again")
      if (password !== confirmationPassword)
        throw Error("Password and confirmation password are not match")
      const decoded = verify(authorization, process.env.JWT_SECRET_KEY ?? "")
      console.log("decoded", decoded)
      if (!decoded) throw Error("Something went wrong please try again")
      const user = await User.findOne({ id: (decoded as any).id })
      if (!user) throw Error("Something went wrong please try again later")
      user.password = await bcrypt.hash(password, saltRounds)
      await user.save()
      throw Error("Password changed successfully")
    } catch (e: any) {
      return e
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
