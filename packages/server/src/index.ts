import { ApolloServer, gql } from "apollo-server"

import "dotenv/config"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { createConnection, getConnection, getRepository } from "typeorm"
import { SharedContextType } from "./context/types"
import { UserResolver } from "./resolvers/UserResolver"
import { PostResolver } from "./resolvers/PostResolver"
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader"
import { CommentsResolver } from "./resolvers/CommentResolver"
import { AdminResolver } from "./resolvers/AdminResolver"

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
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    },
    synchronize: true
  }).then(() => console.log("db create succesfully"))

  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, CommentsResolver, AdminResolver]
  })
  // A map of functions which return data for the schema.

  const server = new ApolloServer({
    schema,
    cors: { origin: "*", credentials: true, methods: ["GET", "POST"] },
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection // for use with TypeORM
      })
    ],
    context: async ({ req, res }): Promise<SharedContextType> => {
      return {
        req,
        res,
        repo: getRepository,
        userJwtPayload: null,
        connection: getConnection
      }
    }
  })
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}

main().catch((err) => console.log(err))
