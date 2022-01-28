import { MiddlewareFn } from "type-graphql"
import { verify } from "jsonwebtoken"
import { SharedContextType, userJWTPayloadType } from "../context/types"

//format like bearer 21321n2bmbbj
const isAuth: MiddlewareFn<SharedContextType> = ({ context }, next) => {
  const authorization = context.req.headers.authorization

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
  if (!payload) throw new Error("PAYLOAD JWT ERROR")
  console.log(payload)
  context.userJwtPayload = payload as userJWTPayloadType
  return next()
}

const isAdmin: MiddlewareFn<SharedContextType> = ({ context }, next) => {
  const payload = context.userJwtPayload
  if (!payload) throw new Error("There is no payload to check your role ")
  if (payload.role === "ADMIN") return next()
  throw new Error("You have to be admin")
}
export { isAdmin, isAuth }
