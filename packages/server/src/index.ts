import "dotenv/config"
import "reflect-metadata"
import { startApolloExpressServer } from "./apollo/apolloServer"
import { dbConnection } from "./db/db"
import { initNodeMailer } from "./nodemailer"

const main = async () => {
  await dbConnection()
  await startApolloExpressServer()
  await initNodeMailer()
}

main().catch((err) => console.log(err))
