import express from "express"
import { getRepository, getConnection } from "typeorm"
import { RoleType } from "../entities/User"

export type userJWTPayloadType = {
  id: string
  email: string
  displayName: string
  role: RoleType | string
}

export type SharedContextType = {
  connection: typeof getConnection
  repo: typeof getRepository
  req: typeof express.request
  res: typeof express.response
  userJwtPayload: userJWTPayloadType | undefined
}
