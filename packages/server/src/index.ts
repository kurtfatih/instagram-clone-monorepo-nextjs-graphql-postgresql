import { ApolloServer, gql } from "apollo-server"

import "dotenv/config"
import cors from "cors"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { Any, createConnection, getRepository } from "typeorm"
import { SharedContextType } from "./context/types"
import { UserResolver } from "./resolvers/UserResolver"
import { IncomingMessage } from "http"

const main = async () => {
  console.log("main servr")
  // run db
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "fatihkurt",
    password: "asd",
    database: "postgres",
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"], //   subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    },
    synchronize: true
  }).then(() => console.log("db create succesfully"))

  // {
  //   type: "postgres",
  //   host: "localhost",
  //   port: 5432,
  //   username: "fatihkurt",
  //   password: "admin",
  //   role: "admin",
  //   database: "postgres",
  //   entities: ["src/entities/**/*.ts"],
  //   migrations: ["src/migration/**/*.ts"],
  //   subscribers: ["src/subscriber/**/*.ts"],
  //   cli: {
  //     entitiesDir: "src/entities",
  //     migrationsDir: "src/migration",
  //     subscribersDir: "src/subscriber"
  //   }
  // }
  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  // A map of functions which return data for the schema.

  const server = new ApolloServer({
    schema,
    cors: { origin: "*", credentials: true, methods: ["GET", "POST"] },

    context: async ({ req, res }): Promise<SharedContextType> => {
      return { req, res, repo: getRepository, payload: "" }
    }
  })
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}

main().catch((err) => console.log(err))
