import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import fetch from 'node-fetch'

const httpLink = new HttpLink({
  uri: 'https://hasura-template-production.up.railway.app/v1/graphql',
  //@ts-ignore
  fetch,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      //   authorization: `Bearer 8ba64bb8-5720-491e-bc46-eea64a9e11ff`,
      authorization: `Bearer 8ba64bb8-5720-491e-bc46-eea64a9e11ff`,
      'x-hasura-admin-secret': 'iwillhack',
    },
  }
})

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
