import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://185.200.44.108/graphql",
  cache: new InMemoryCache(),
  cors: {
    origin: ["https://localhost:3000", "https://studio.apollographql.com"],
  },
  typePolicies: {
    Query: {
      fields: {
        products: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        }
      }
    }
  }
});

export default client;
