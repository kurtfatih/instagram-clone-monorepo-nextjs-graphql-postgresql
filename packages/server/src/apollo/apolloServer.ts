import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import http from "http"
import express from "express"
import { buildSchema } from "type-graphql"
import { execute, subscribe } from "graphql"
import { graphqlUploadExpress, Upload } from "graphql-upload"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader"
import { getConnection, getRepository } from "typeorm"

import { SharedContextType } from "../context/types"
import { AdminResolver } from "../resolvers/AdminResolver"
import { CommentsResolver } from "../resolvers/CommentResolver"
import { PostResolver } from "../resolvers/PostResolver"
import { UserResolver } from "../resolvers/UserResolver"

export const startApolloExpressServer = async () => {
  // express configuration
  const app = express()
  app.get("/", (_, res) => {
    res.redirect("/graphql")
  })
  const httpServer = http.createServer(app)
  app.use(cors())
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  // schema
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      PostResolver,
      CommentsResolver,
      AdminResolver,
      Upload
    ]
  })

  // main apollo server
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection // for use with TypeORM
      }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            }
          }
        }
      }
    ],
    context: async ({ req, res }): Promise<SharedContextType> => {
      return {
        req,
        res,
        repo: getRepository,
        userJwtPayload: undefined,
        connection: getConnection
      }
    }
  })

  // subscription server create
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe
    },
    {
      server: httpServer,
      path: `${server.graphqlPath}`
    }
  )

  // apollo server start engine and applying express as middleware
  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log(
    `🚀 Apollo Server ready at http://localhost:4000${server.graphqlPath}`
  )
}
