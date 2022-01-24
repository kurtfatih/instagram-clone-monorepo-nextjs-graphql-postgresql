import { MiddlewareFn } from "type-graphql"
import { verify } from "jsonwebtoken"
import { SharedContextType } from "../context/types"

//format like bearer 21321n2bmbbj
export const isAuth: MiddlewareFn<SharedContextType> = ({ context }, next) => {
  const authorization = context.req.headers.authorization

  // console.log("we runned", context.event.headers.authorization as any)

  if (!authorization) {
    throw new Error("Not authenticated")
  }
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Not secret key ")
  }
  const token = authorization.split(" ")[1]

  // console.log("token", token)
  const payload = verify(token, process.env.JWT_SECRET_KEY)
  console.log("check this out here", token, payload)

  // console.log(payload)
  context.payload = payload
  return next()
}

export const isLoggedIn: MiddlewareFn<SharedContextType> = async (
  { context },
  next
) => {
  console.log("context payload", !context.payload)
  if (!context.payload) {
    console.log("run next hit")
    // run next if user not already logged in
    return next()
  }
  throw new Error("user already logged in")
}
