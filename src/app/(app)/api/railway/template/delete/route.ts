import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import fetch from 'node-fetch'

// Define the mutation
const TEMPLATE_DELETE_MUTATION = gql`
  mutation ProjectDelete($id: String!) {
    railway {
      projectDelete(id: $id)
    }
  }
`

const httpLink = new HttpLink({
  uri: 'https://hasura-template-production.up.railway.app/v1/graphql',
  fetch,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer 8ba64bb8-5720-491e-bc46-eea64a9e11ff`,
      'x-hasura-admin-secret': 'iwillhack',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export async function POST(req) {
  try {
    const { id } = await req.json()

    const { data } = await client.mutate({
      mutation: TEMPLATE_DELETE_MUTATION,
      variables: { id },
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error during template delete:', error)

    return new Response(
      JSON.stringify({ error: 'Failed to delete template' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
