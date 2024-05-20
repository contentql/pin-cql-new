import { gql } from '@apollo/client'
import { NextRequest } from 'next/server'

import client from '@/lib/apollo/apolloClient'

// Define the mutation
const TEMPLATE_UPDATE_MUTATION = gql`
  mutation UpdateEnv($input: VariableCollectionUpsertInput!) {
    railway {
      variableCollectionUpsert(input: $input)
    }
  }
`

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json()

    const { data } = await client.mutate({
      mutation: TEMPLATE_UPDATE_MUTATION,
      variables: { input },
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error during template updating:', error)

    return new Response(
      JSON.stringify({ error: 'Failed to update template' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
