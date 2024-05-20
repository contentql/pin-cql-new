import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { env } from '@env'
import fetch from 'node-fetch'

const httpLink = new HttpLink({
  uri: env.HASURA_URI,
  //@ts-ignore
  fetch,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      //   authorization: `Bearer 8ba64bb8-5720-491e-bc46-eea64a9e11ff`,
      authorization: `Bearer ${env.RAILWAY_SUPER_API}`,
      'x-hasura-admin-secret': env.HASURA_API_KEY,
    },
  }
})

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
