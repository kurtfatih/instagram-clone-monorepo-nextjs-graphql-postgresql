import { ExpressContext } from "apollo-server-express"
import express from "express"
import { IncomingHttpHeaders, IncomingMessage } from "http"
import { JwtPayload } from "jsonwebtoken"
import { getRepository, ConnectionManager, getConnection } from "typeorm"
import { User } from "../entities/User"

export type SharedContextType = {
  connection: typeof getConnection
  repo: typeof getRepository
  req: typeof express.request
  res: typeof express.response
  payload: string | JwtPayload
}
