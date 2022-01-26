import { createConnection } from "typeorm"
import { dbConfig } from "./dbConfig"

export const dbConnection = async () =>
  await createConnection({ ...dbConfig }).then(() =>
    console.log("🚀 Db connection ready")
  )
