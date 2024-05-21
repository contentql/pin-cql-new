import { gql } from '@apollo/client'
import { NextRequest } from 'next/server'

import client from '@/lib/apollo/apolloClient'

// Define the mutation
const TEMPLATE_DELETE_MUTATION = gql`
  mutation ProjectDelete($id: String!) {
    railway {
      projectDelete(id: $id)
    }
  }
`

export async function POST(req: NextRequest) {
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
    console.error('Error during template deletion:', error)

    return new Response(
      JSON.stringify({ error: 'Failed to delete template' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
