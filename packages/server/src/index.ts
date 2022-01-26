import { ApolloServer } from "apollo-server-express"

import "dotenv/config"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import http from "http"
import { createConnection, getConnection, getRepository } from "typeorm"
import { SharedContextType } from "./context/types"
import { UserResolver } from "./resolvers/UserResolver"
import { PostResolver } from "./resolvers/PostResolver"
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader"
import { CommentsResolver } from "./resolvers/CommentResolver"
import { AdminResolver } from "./resolvers/AdminResolver"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import express from "express"
import cors from "cors"
import { Upload, graphqlUploadExpress } from "graphql-upload"

const main = async () => {
  console.log("main servr")
  const app = express()
  const httpServer = http.createServer(app)
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

  app.use(cors())
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      PostResolver,
      CommentsResolver,
      AdminResolver,
      Upload
    ]
  })
  // A map of functions which return data for the schema.

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
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

  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

main().catch((err) => console.log(err))
