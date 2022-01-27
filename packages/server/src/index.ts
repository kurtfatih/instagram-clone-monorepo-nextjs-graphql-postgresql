import "dotenv/config"
import "reflect-metadata"
import { startApolloExpressServer } from "./apollo/apolloServer"
import { dbConnection } from "./db/db"

const main = async () => {
  await dbConnection()
  await startApolloExpressServer()
}

main().catch((err) => console.log(err))
