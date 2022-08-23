import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://185.200.44.108",
    cache: new InMemoryCache(),
});

export default client;