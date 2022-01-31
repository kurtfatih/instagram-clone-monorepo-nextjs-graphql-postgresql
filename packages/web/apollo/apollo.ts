import { ApolloClient, InMemoryCache } from "@apollo/client"

import { HttpLink } from "@apollo/client/link/http"

function getApolloServerLink() {
  // todo seperated production version & dev version link
  return new HttpLink({ uri: "http://localhost:4000/graphql" })
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: getApolloServerLink(),
    cache: new InMemoryCache()
  })
}
export { createApolloClient }
