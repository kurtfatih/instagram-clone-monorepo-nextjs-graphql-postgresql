import jwt from "jsonwebtoken"
import { userJWTPayloadType } from "../context/types"
export const generateJwtToken = (
  payload: string | object | Buffer,
  options?: jwt.SignOptions | undefined
) => {
  if (!process.env.JWT_SECRET_KEY) return
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)
  return token
}
