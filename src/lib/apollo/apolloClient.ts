import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { env } from '@env'

import { getRailwayApiToken } from './railwayToken'

// import fetch from 'node-fetch'

const httpLink = new HttpLink({
  uri: env.NEXT_PUBLIC_HASURA_URI,
  fetch,
})

const authLink = setContext(async (_, { headers }) => {
  const railwayApiToken = await getRailwayApiToken()

  if (!railwayApiToken) {
    console.error('Railway API token is undefined')
  } else {
    console.log('Railway API token', railwayApiToken)
  }

  return {
    headers: {
      ...headers,
      //   authorization: `Bearer 8ba64bb8-5720-491e-bc46-eea64a9e11ff`,
      authorization: `Bearer ${railwayApiToken}`,
      'x-hasura-admin-secret': env.HASURA_API_KEY,
    },
  }
})

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
})

export default client
