import { ExpressContext } from "apollo-server-express"
import express from "express"
import { IncomingHttpHeaders, IncomingMessage } from "http"
import { JwtPayload } from "jsonwebtoken"
import { getRepository } from "typeorm"

export type SharedContextType = {
  repo: typeof getRepository
  req: typeof express.request
  res: typeof express.response
  payload: string | JwtPayload
}
