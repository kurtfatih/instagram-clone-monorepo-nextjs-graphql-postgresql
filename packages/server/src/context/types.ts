import { ExpressContext } from "apollo-server-express"
import express from "express"
import { IncomingHttpHeaders, IncomingMessage } from "http"
import { JwtPayload } from "jsonwebtoken"
import { getRepository, ConnectionManager, getConnection } from "typeorm"
import { RoleType, User } from "../entities/User"

export type userJWTPayloadType = {
  id: string
  email: string
  displayName: string
  role: RoleType
}

export type SharedContextType = {
  connection: typeof getConnection
  repo: typeof getRepository
  req: typeof express.request
  res: typeof express.response
  userJwtPayload: userJWTPayloadType | null
}
