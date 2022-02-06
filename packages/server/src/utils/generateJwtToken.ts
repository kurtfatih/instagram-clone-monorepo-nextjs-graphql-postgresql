import jwt from "jsonwebtoken"
import { userJWTPayloadType } from "../context/types"
export const generateAccessToken = (userJwtPayloadType: userJWTPayloadType) => {
  if (!process.env.JWT_SECRET_KEY) return
  const token = jwt.sign(userJwtPayloadType, process.env.JWT_SECRET_KEY, {
    expiresIn: "5s"
  })
  return token
}
